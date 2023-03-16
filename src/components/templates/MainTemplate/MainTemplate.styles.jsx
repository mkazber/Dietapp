import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 100%;
  margin: 0;
  padding: 0;

  background-color: ${({ theme }) => theme.colors.lightGrey};

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 280px 1fr;
  }
`;
