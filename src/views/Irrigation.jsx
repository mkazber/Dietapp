import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../helpers/localStorage';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import IrrigationTable from '../components/organisms/Table/IrrigationTable';
import FormIrrigation from '../components/organisms/Form/FormIrrigation';
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

const Irrigation = () => {
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  const { currentUser, users } = useContext(UsersContext);

  const [stateIrrigation, setStateIrrigation] = useState([]);
  const [valueBar, setValueBar] = useState({});

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueIrrigation && setStateIrrigation(user.valueIrrigation);
      }
    });
  }, []);

  useEffect(() => {
    const date = stateIrrigation.map(obj => obj.date);
    const irrigation = stateIrrigation.map(obj => obj.irrigation);
    let newData = {
      date,
      irrigation,
    };

    setValueBar(newData);

    if (!users.length) return;
    storeData('users', users);
  }, [stateIrrigation]);

  const handleChangeIrrigation = value => {
    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueIrrigation = [...stateIrrigation, value];
      }
    });

    setStateIrrigation(prevState => [...prevState, value]);
  };

  const handleUndo = () => {
    const irrigation = stateIrrigation.slice(0, -1);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueIrrigation = [...irrigation];
      }
    });

    setStateIrrigation(irrigation);
  };

  return (
    <>
      <ViewWrapper>
        <Title>Wprowadź poziom nawodnienia</Title>
        <FormIrrigation change={handleChangeIrrigation} />
        {stateIrrigation.length ? (
          <Bar labelData={valueBar.date} labelValue={valueBar.irrigation ? valueBar.irrigation : [0]} unit="%" />
        ) : (
          ''
        )}
        {stateIrrigation.length ? (
          <Wrapper>
            <IrrigationTable valueTable={stateIrrigation} />
          </Wrapper>
        ) : (
          ''
        )}
        {stateIrrigation.length ? (
          <Wrapper>
            <Button onClick={handleUndo}>Usuń ostatni wynik</Button>
          </Wrapper>
        ) : (
          ''
        )}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>Nawodnienie</strong>
        </Text>
        <Text>
          Nasz organizm przetrwa dużo dłużej bez jedzenia niż bez wody. Nasz organizm w 70% procentach się z niej
          składa. Woda odpowiada za prawidłowe funkcjonowanie naszego organizmu, kontroluje temperaturę ciała, wpływa na
          trawienie czyli meta- bolizm i oczyszczanie z toksyn. Do tego nie zawiera kalorii jak słodzone napoje czy
          soki, więc sprzyja odchudzaniu. Zaleca się picie 30 ml na każdy kilogram ciała, ale trzeba wziąć pod uwagę, że
          przy większym wysiłku ubywa nam jej szybciej.
        </Text>
        <Text>Prawidłowy poziom nawodnienia u mężczyzn (%):</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Alarm</TableCell>
                  <TableCell align="left">Niski</TableCell>
                  <TableCell align="left">Optymalny</TableCell>
                  <TableCell align="left">Wysoki</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">&lt; 50</TableCell>
                  <TableCell align="left">50 - 55</TableCell>
                  <TableCell align="left">55 - 65</TableCell>
                  <TableCell align="left">&gt; 65</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
        <Text>Prawidłowy poziom nawodnienia u kobiet (%):</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Alarm</TableCell>
                  <TableCell align="left">Niski</TableCell>
                  <TableCell align="left">Optymalny</TableCell>
                  <TableCell align="left">Wysoki</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">&lt; 45</TableCell>
                  <TableCell align="left">45 - 50</TableCell>
                  <TableCell align="left">50 - 60</TableCell>
                  <TableCell align="left">&gt; 60</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
      </ViewWrapper>
    </>
  );
};

export default Irrigation;
