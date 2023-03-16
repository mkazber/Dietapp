import styled from 'styled-components';

export const Wrapper = styled.li`
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: lightgrey;
  }
`;

export const StyledUser = styled.div`
  display: flex;
  padding: 25px 0;
`;

export const StyledAverage = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  background: ${({ theme, value }) => {
    if (value === 'male') return theme.colors.male;
    if (value === 'female') return theme.colors.female;
    return theme.colors.grey;
  }};
`;

export const StyledInfo = styled.div`
  margin-left: 20px;
`;
