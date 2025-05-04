import { FC } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { PostCard } from '../../components/Post';
import { Container, Text } from '../../components/ui';
import Seo from '../../components/Seo';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

const Title = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

interface HashtagPageProps {
  tag: string;
}

const fetchPosts = async ({ queryKey }) => {
  const [, tag] = queryKey;
  const { data } = await axios.get(`/posts/hashtag/${tag}`);
  return data;
};

const HashtagPage: FC<HashtagPageProps> = ({ tag }) => {
  const { data: posts = [] } = useQuery(['hashtag', tag], fetchPosts);

  return (
    <Layout>
      <Seo title={`#${tag}`} />
      <Container maxWidth="md" marginTop="sm">
        <Title>
          <Text size="xl" weight="bold">
            #{tag}
          </Text>
        </Title>
        {posts.length === 0 ? (
          <Text>No posts found with this hashtag.</Text>
        ) : (
          posts.map((post: any) => (
            <PostCard key={post._id} post={post} queryKey={['hashtag', tag]} />
          ))
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      tag: params?.tag || '',
    },
  };
};

export default HashtagPage; 