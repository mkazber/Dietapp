import styled from 'styled-components';

export const Button = styled.button`
  margin: 20px 0px;
  padding: 7px 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme }) => theme.colors.lightPurple};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
  transition: 0.3s linear opacity;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
