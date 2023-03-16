import styled from 'styled-components';

export const UnorderedList = styled.ul`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.darkGrey};
  margin: 0 0 20px;
  padding: 0 0 0 20px;
`;
