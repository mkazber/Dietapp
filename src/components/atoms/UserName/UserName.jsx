import styled from 'styled-components';

export const UserName = styled.p`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.darkGrey};
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.l};
`;
