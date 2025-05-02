import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing.xs};
`;

export const RadioInput = styled.input`
  margin-right: ${(p) => p.theme.spacing.xs};
  cursor: pointer;
`;

export const Label = styled.label`
  cursor: pointer;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.general.text};
`; 