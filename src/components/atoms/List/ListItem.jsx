import styled from 'styled-components';

export const ListItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.darkGrey};

  &:not(:first-child) {
    margin: 10px 0 0;
  }
`;
