import { theme } from '../assets/styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import UsersProvider from '../providers/UsersProvider';
import Dashboard from '../views/Dashboard';
import UserChoice from '../views/UserChoice';
import AddUser from './AddUser';
import { Container } from '../components/atoms/Container/Container';
import Bmi from '../views/Bmi';
import FatTissue from '../views/FatTissue';
import MuscleTissue from '../views/MuscleTissue';
import Irrigation from '../views/Irrigation';
import BoneMineralizationMass from '../views/BoneMineralizationMass';
import AbdominalFat from '../views/AbdominalFat';
import Cpm from '../views/Cpm';
import Advices from '../views/Advices';

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UsersProvider>
          <MainTemplate>
            <Container>
              <Routes>
                <Route path="/dodaj-uzytkownika" element={<AddUser />} />
                <Route exact path="/" element={<UserChoice />} />
                <Route exact path="/porady" element={<Advices />} />
                <Route path="/panel-uzytkownika" element={<Dashboard />} />
                <Route path="/bmi" element={<Bmi />} />
                <Route path="/tkanka-tluszczowa" element={<FatTissue />} />
                <Route path="/tkanka-miesniowa" element={<MuscleTissue />} />
                <Route path="/nawodnienie" element={<Irrigation />} />
                <Route path="/masa-mineralizacji-kostnej" element={<BoneMineralizationMass />} />
                <Route path="/tluszcz-brzuszny" element={<AbdominalFat />} />
                <Route path="/cpm" element={<Cpm />} />
              </Routes>
            </Container>
          </MainTemplate>
        </UsersProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
