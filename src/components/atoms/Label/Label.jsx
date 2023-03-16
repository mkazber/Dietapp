import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin: 0 0 10px;
`;
