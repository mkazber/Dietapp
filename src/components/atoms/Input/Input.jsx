import styled from 'styled-components';

export const Input = styled.input`
  margin-top: 10px;

  &:not([type='radio']) {
    padding: 5px 8px;
    border: 1px solid ${({ theme }) => theme.colors.darkPurple};
    box-sizing: border-box;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
    border-radius: 25px;
    height: 32px;
    width: 100%;

    &:focus {
      outline: none;
      box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
    }

    &::placeholder {
      opacity: 0.5;
    }
  }
`;
