import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../helpers/localStorage';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import MuscleTissueTable from '../components/organisms/Table/MuscleTissueTable';
import FormMuscleTissue from '../components/organisms/Form/FormMuscleTissue';
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

const MuscleTissue = () => {
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  const { currentUser, users } = useContext(UsersContext);

  const [stateMuscleTissue, setStateMuscleTissue] = useState([]);
  const [valueBar, setValueBar] = useState({});

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueMuscleTissue && setStateMuscleTissue(user.valueMuscleTissue);
      }
    });
  }, []);

  useEffect(() => {
    const date = stateMuscleTissue.map(obj => obj.date);
    const muscleTissue = stateMuscleTissue.map(obj => obj.muscleTissue);
    let newData = {
      date,
      muscleTissue,
    };

    setValueBar(newData);

    if (!users.length) return;
    storeData('users', users);
  }, [stateMuscleTissue]);

  const handleChangeMuscleTissue = value => {
    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueMuscleTissue = [...stateMuscleTissue, value];
      }
    });

    setStateMuscleTissue(prevState => [...prevState, value]);
  };

  const handleUndo = () => {
    const muscleTissue = stateMuscleTissue.slice(0, -1);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueMuscleTissue = [...muscleTissue];
      }
    });

    setStateMuscleTissue(muscleTissue);
  };

  return (
    <>
      <ViewWrapper>
        <Title>Wprowadź ilość tkanki mięśniowej</Title>
        <FormMuscleTissue change={handleChangeMuscleTissue} />
        {stateMuscleTissue.length ? (
          <Bar labelData={valueBar.date} labelValue={valueBar.muscleTissue ? valueBar.muscleTissue : [0]} unit="%" />
        ) : (
          ''
        )}
        {stateMuscleTissue.length ? (
          <Wrapper>
            <MuscleTissueTable valueTable={stateMuscleTissue} />
          </Wrapper>
        ) : (
          ''
        )}
        {stateMuscleTissue.length ? (
          <Wrapper>
            <Button onClick={handleUndo}>Usuń ostatni wynik</Button>
          </Wrapper>
        ) : (
          ''
        )}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>Tkanka mięśniowa</strong> jedna z najbardziej pożądanych tkanek w organizmie przez mężczyzn. Dobrze
          zbudowany facet podświadomie kobietom kojarzy się z siłą i bezpieczeństwem. Taki osobnik jest powszechnie
          uważany za bardziej atrakcyjnego. Przy diecie odchudza- jącej ważne jest, aby tej tkanki ubyło jak najmniej.
          Głównym budulcem mięśni jest białko, dlatego przy odchudzaniu ważne jest żeby dostarczyć organizmowi
          odpowiednią podaż białka. Prawidłowy poziom tkanki mięśniowej jest wyliczany na podstawie wieku oraz jej
          procentowej zawartości w organizmie.
        </Text>
        <Text>Prawidłowy poziom tkanki mięśniowej u mężczyzn (%):</Text>
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
                  <TableCell align="left">&lt; 65</TableCell>
                  <TableCell align="left">65 - 70</TableCell>
                  <TableCell align="left">70 - 80</TableCell>
                  <TableCell align="left">&gt; 80</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
        <Text>Prawidłowy poziom tkanki mięśniowej u kobiet (%):</Text>
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
                  <TableCell align="left">&lt; 60</TableCell>
                  <TableCell align="left">60 - 65</TableCell>
                  <TableCell align="left">65 - 75</TableCell>
                  <TableCell align="left">&gt; 75</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
      </ViewWrapper>
    </>
  );
};

export default MuscleTissue;
