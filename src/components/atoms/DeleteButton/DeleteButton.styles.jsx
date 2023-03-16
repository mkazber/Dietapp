import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 4px;
  width: 22px;
  height: 22px;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 50px;
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .3s linear opacity;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    opacity: .7;
  }
`;
