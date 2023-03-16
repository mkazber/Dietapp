import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../helpers/localStorage';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import AbdominalFatTable from '../components/organisms/Table/AbdominalFatTable';
import FormAbdominalFat from '../components/organisms/Form/FormAbdominalFat';
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

const AbdominalFat = () => {
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  const { currentUser, users } = useContext(UsersContext);

  const [stateAbdominalFat, setStateAbdominalFat] = useState([]);
  const [valueBar, setValueBar] = useState({});

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueAbdominalFat && setStateAbdominalFat(user.valueAbdominalFat);
      }
    });
  }, []);

  useEffect(() => {
    const date = stateAbdominalFat.map(obj => obj.date);
    const abdominalFat = stateAbdominalFat.map(obj => obj.abdominalFat);
    let newData = {
      date,
      abdominalFat,
    };

    setValueBar(newData);

    if (!users.length) return;
    storeData('users', users);
  }, [stateAbdominalFat]);

  const handleChangeAbdominalFat = value => {
    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueAbdominalFat = [...stateAbdominalFat, value];
      }
    });

    setStateAbdominalFat(prevState => [...prevState, value]);
  };

  const handleUndo = () => {
    const abdominalFat = stateAbdominalFat.slice(0, -1);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueAbdominalFat = [...abdominalFat];
      }
    });

    setStateAbdominalFat(abdominalFat);
  };

  return (
    <>
      <ViewWrapper>
        <Title>Wprowadź poziom tłuszczu brzusznego</Title>
        <FormAbdominalFat change={handleChangeAbdominalFat} />
        {stateAbdominalFat.length ? (
          <Bar labelData={valueBar.date} labelValue={valueBar.abdominalFat ? valueBar.abdominalFat : [0]} />
        ) : (
          ''
        )}
        {stateAbdominalFat.length ? (
          <Wrapper>
            <AbdominalFatTable valueTable={stateAbdominalFat} />
          </Wrapper>
        ) : (
          ''
        )}
        {stateAbdominalFat.length ? (
          <Wrapper>
            <Button onClick={handleUndo}>Usuń ostatni wynik</Button>
          </Wrapper>
        ) : (
          ''
        )}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>Tłuszcz brzuszny</strong> jest to inaczej tłuszcz trzewny, czyli tłuszcz który osadza się głęboko w
          obszarze brzusznym otaczając i chroniąc organy wewnętrzne. Zwiększona masa ciała często idzie w parze z
          zwiększoną ilością tłuszczu brzusznego, a to może powodować nie tylko okrągły tors, ale także różnego rodzaju
          problemy zdrowotne jak cukrzycę, choroby sercowe. W przypadku za dużej ilości kilogramów w naszym ciele, dieta
          nie tylko poprawi nasz wygląd, a także zmniejszy ryzyko wystąpienia chorób w organizmie.
        </Text>
        <Text>Prawidłowy wskaźnik tłuszczu brzusznego:</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Optymalny</TableCell>
                  <TableCell align="left">Nadmiar</TableCell>
                  <TableCell align="left">Wysoki</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">1 - 9</TableCell>
                  <TableCell align="left">10 - 14</TableCell>
                  <TableCell align="left">15 - 59</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
      </ViewWrapper>
    </>
  );
};

export default AbdominalFat;
