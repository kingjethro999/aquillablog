import React from 'react';
import styled from 'styled-components';
import { Link } from '../../ui';

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-right: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

interface HashtagProps {
  tag: string;
}

const Hashtag: React.FC<HashtagProps> = ({ tag }) => {
  return (
    <StyledLink href={`/hashtag/${tag}`}>
      #{tag}
    </StyledLink>
  );
};

export default Hashtag; 