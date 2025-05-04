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

interface MentionProps {
  username: string;
}

const Mention: React.FC<MentionProps> = ({ username }) => {
  return (
    <StyledLink href={`/profile/${username}`}>
      @{username}
    </StyledLink>
  );
};

export default Mention; 