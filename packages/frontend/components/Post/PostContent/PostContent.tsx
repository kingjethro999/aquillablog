import React from 'react';
import styled from 'styled-components';
import { Text } from '../../ui';
import Hashtag from '../Hashtag/Hashtag';

const Content = styled(Text)`
  white-space: pre-line;
  word-wrap: break-word;
  padding: 0 ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

interface PostContentProps {
  title: string;
}

const PostContent: React.FC<PostContentProps> = ({ title }) => {
  if (!title) return null;

  const parts = title.split(/(#\w+)/g);
  
  return (
    <Content>
      {parts.map((part, index) => {
        if (part.startsWith('#')) {
          return <Hashtag key={index} tag={part.slice(1)} />;
        }
        return part;
      })}
    </Content>
  );
};

export default PostContent; 