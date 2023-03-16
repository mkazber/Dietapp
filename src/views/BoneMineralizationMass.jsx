import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../helpers/localStorage';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import BoneMineralizationMassTable from '../components/organisms/Table/BoneMineralizationMassTable';
import FormBoneMineralizationMass from '../components/organisms/Form/FormBoneMineralizationMass';
import Bar from '../components/organisms/Bar/Bar';
import { Wrapper } from '../components/atoms/Wrapper/Wrapper';
import { UsersContext } from '../providers/UsersProvider';
import { ViewWrapper } from '../components/molecules/ViewWrapper/ViewWrapper';
import { Text } from '../components/atoms/Text/Text';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BoneMineralizationMass = () => {
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  const { currentUser, users } = useContext(UsersContext);

  const [stateBoneMineralizationMass, setStateBoneMineralizationMass] = useState([]);
  const [valueBar, setValueBar] = useState({});

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueBoneMineralizationMass && setStateBoneMineralizationMass(user.valueBoneMineralizationMass);
      }
    });
  }, []);

  useEffect(() => {
    const date = stateBoneMineralizationMass.map(obj => obj.date);
    const boneMineralizationMass = stateBoneMineralizationMass.map(obj => obj.boneMineralizationMass);
    let newData = {
      date,
      boneMineralizationMass,
    };

    setValueBar(newData);

    if (!users.length) return;
    storeData('users', users);
  }, [stateBoneMineralizationMass]);

  const handleChangeBoneMineralizationMass = value => {
    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueBoneMineralizationMass = [...stateBoneMineralizationMass, value];
      }
    });

    setStateBoneMineralizationMass(prevState => [...prevState, value]);
  };

  const handleUndo = () => {
    const boneMineralizationMassmi = stateBoneMineralizationMass.slice(0, -1);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueBoneMineralizationMass = [...boneMineralizationMassmi];
      }
    });

    setStateBoneMineralizationMass(boneMineralizationMassmi);
  };

  return (
    <>
      <ViewWrapper>
        <Title>Wprowadź poziom mineralizacji kostnej</Title>
        <FormBoneMineralizationMass change={handleChangeBoneMineralizationMass} />
        {stateBoneMineralizationMass.length ? (
          <Bar
            labelData={valueBar.date}
            labelValue={valueBar.boneMineralizationMass ? valueBar.boneMineralizationMass : [0]}
          />
        ) : (
          ''
        )}
        {stateBoneMineralizationMass.length ? (
          <Wrapper>
            <BoneMineralizationMassTable valueTable={stateBoneMineralizationMass} />
          </Wrapper>
        ) : (
          ''
        )}
        {stateBoneMineralizationMass.length ? (
          <Wrapper>
            <Button onClick={handleUndo}>Usuń ostatni wynik</Button>
          </Wrapper>
        ) : (
          ''
        )}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>Masa układu kostnego</strong> nie zmienia się znacznie u człowieka, ale choroby mogą wpłynąć na
          gęstość kości. Każdy z nas między 20, a 30 rokiem życia dochodzi do maksymalnej gęstości masy kostnej. W swoim
          szycie, jeżeli stała ona na niskim poziomie, demineralizacja5 może postępować szybciej. Przy odchudzaniu warto
          za- dbać o odpowiednią podaż wapnia i witamin, ponieważ nieodpowiednia utrata wagi również może skutkować
          obniżeniu gęstości masy kostnej.
        </Text>
        <Text>Prawidłowy poziom mineralizacji kostnej u mężczyzn (kg):</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">&lt; 65kg</TableCell>
                  <TableCell align="left">65 - 95kg</TableCell>
                  <TableCell align="left">&gt; 95kg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">&lt; 2,65</TableCell>
                  <TableCell align="left">3,29</TableCell>
                  <TableCell align="left">3,69</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
        <Text>Prawidłowy poziom mineralizacji kostnej u kobiet (kg):</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">&lt; 50kg</TableCell>
                  <TableCell align="left">50 - 75kg</TableCell>
                  <TableCell align="left">&gt; 75kg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">&lt; 1,95</TableCell>
                  <TableCell align="left">2,4</TableCell>
                  <TableCell align="left">2,95</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
      </ViewWrapper>
    </>
  );
};

export default BoneMineralizationMass;
