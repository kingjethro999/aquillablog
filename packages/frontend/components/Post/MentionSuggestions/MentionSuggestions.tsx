import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';
import Avatar from '../../ui/Avatar';
import { Config } from '../../../utils/config';

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const Username = styled.span`
  margin-left: 8px;
  font-weight: 500;
`;

interface MentionSuggestionsProps {
  query: string;
  onSelect: (username: string) => void;
}

const MentionSuggestions: React.FC<MentionSuggestionsProps> = ({ query, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: users = [] } = useQuery(
    ['userSuggestions', query],
    async () => {
      const response = await axios.get(`${Config.API_URL}/users/suggestions?query=${query}`);
      return response.data;
    },
    { enabled: !!query }
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen || !users.length) return null;

  return (
    <Dropdown ref={dropdownRef}>
      {users.map(user => (
        <SuggestionItem
          key={user._id}
          onClick={() => {
            onSelect(user.username);
            setIsOpen(false);
          }}
        >
          <Avatar image={user.avatar} size={24} />
          <Username>{user.username}</Username>
        </SuggestionItem>
      ))}
    </Dropdown>
  );
};

export default MentionSuggestions; 