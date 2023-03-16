import React, { useContext } from 'react';
import { Logo, StyledLink, Wrapper } from './Navigation.styles';
import { UsersContext } from '../../../providers/UsersProvider';

const Navigation = () => {
  const { currentUser } = useContext(UsersContext);

  return (
    <Wrapper>
      <Logo>
        <h1>
          Bezpieczne
          <br />
          Odchudzanie
        </h1>
      </Logo>
      <StyledLink to="/">Lista użytkowników</StyledLink>
      <StyledLink to="/porady">Porady</StyledLink>
      {currentUser.hasOwnProperty('id') && <StyledLink to="/panel-uzytkownika">Panel użytkownika</StyledLink>}
      {currentUser.hasOwnProperty('id') && <StyledLink to="/bmi">BMI</StyledLink>}
      {currentUser.hasOwnProperty('id') && <StyledLink to="/tkanka-tluszczowa">Tkanka tłuszczowa</StyledLink>}
      {currentUser.hasOwnProperty('id') && <StyledLink to="/tkanka-miesniowa">Tkanka mięśniowa</StyledLink>}
      {currentUser.hasOwnProperty('id') && <StyledLink to="/nawodnienie">Nawodnienie</StyledLink>}
      {currentUser.hasOwnProperty('id') && (
        <StyledLink to="/masa-mineralizacji-kostnej">Masa mineralizacji kostnej</StyledLink>
      )}
      {currentUser.hasOwnProperty('id') && <StyledLink to="/tluszcz-brzuszny">Tłuszcz brzuszny</StyledLink>}
      {currentUser.hasOwnProperty('id') && <StyledLink to="/cpm">CPM</StyledLink>}
      <StyledLink to="/dodaj-uzytkownika">Dodaj użytkownika</StyledLink>
    </Wrapper>
  );
};

export default Navigation;
