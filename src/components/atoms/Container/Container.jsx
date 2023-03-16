import styled from 'styled-components';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 100%;
  padding: 40px 50px;
  border-radius: 25px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
  
  gap: 20px;
  margin: 30px;

  @media (min-width: 1300px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    display: grid;
  }
`;
