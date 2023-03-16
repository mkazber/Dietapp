import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.darkPurple};
  justify-content: flex-start;
  padding: 0px 0px 30px 0px;

  a {
    padding: 0 10px;
  }

  @media (min-width: 1024px) {
    padding: 30px 0;
  }
`;

export const Logo = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGrey};
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }

  h1 {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.white};
    text-align: left;
    margin: 15px 20px 15px;

    @media (min-width: 1024px) {
      margin-right: 20px;
      text-align: right;
    }
  }
`;

const activeclassname = 'active-link';
export const StyledLink = styled(NavLink).attrs({ activeclassname })`
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: left;
  margin: 15px 20px 15px;
  position: relative;
  transition: 0.3s linear opacity;

  @media (min-width: 1024px) {
    text-align: right;
    margin: 15px 20px 15px auto;
  }

  &.${activeclassname} {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    content: '';
    position: absolute;
    width: 18px;
    height: 3px;
    top: 50%;
    transform: translateY(-50%);
    right: -20px;
    background-color: ${({ theme }) => theme.colors.darkPurple};
  }

  &:hover {
    opacity: 0.7;
  }
`;
