import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../helpers/localStorage';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import FatTissueTable from '../components/organisms/Table/FatTissueTable';
import FormFatTissue from '../components/organisms/Form/FormFatTissue';
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

const FatTissue = () => {
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  const { currentUser, users } = useContext(UsersContext);

  const [stateFatTissue, setStateFatTissue] = useState([]);
  const [valueBar, setValueBar] = useState({});

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueFatTissue && setStateFatTissue(user.valueFatTissue);
      }
    });
  }, []);

  useEffect(() => {
    const date = stateFatTissue.map(obj => obj.date);
    const fatTissue = stateFatTissue.map(obj => obj.fatTissue);
    let newData = {
      date,
      fatTissue,
    };

    setValueBar(newData);

    if (!users.length) return;
    storeData('users', users);
  }, [stateFatTissue]);

  const handleChangeFatTissue = value => {
    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueFatTissue = [...stateFatTissue, value];
      }
    });

    setStateFatTissue(prevState => [...prevState, value]);
  };

  const handleUndo = () => {
    const fatTissue = stateFatTissue.slice(0, -1);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueFatTissue = [...fatTissue];
      }
    });

    setStateFatTissue(fatTissue);
  };

  return (
    <>
      <ViewWrapper>
        <Title>Wprowadź ilość tkanki tłuszczowej</Title>
        <FormFatTissue change={handleChangeFatTissue} />
        {stateFatTissue.length ? (
          <Bar labelData={valueBar.date} labelValue={valueBar.fatTissue ? valueBar.fatTissue : [0]} unit="%" />
        ) : (
          ''
        )}
        {stateFatTissue.length ? (
          <Wrapper>
            <FatTissueTable valueTable={stateFatTissue} />
          </Wrapper>
        ) : (
          ''
        )}
        {stateFatTissue.length ? (
          <Wrapper>
            <Button onClick={handleUndo}>Usuń ostatni wynik</Button>
          </Wrapper>
        ) : (
          ''
        )}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>Tkanka tłuszczowa</strong> jest rodzajem tkanki łącznej, znajduje się głównie na brzuchu, pośladkach
          oraz udach. Jej celem jest magazynowanie energii i ochrona narządów, lecz w przypadku jej znacznego wzrostu
          może zaburzyć funkcje organizmu. Pozbycie się nadmiaru tkanki tłuszczowej jest możliwe przy utrzymaniu
          odpowiedniego deficytu kalorycznego. Głodzenie nie jest dobrym wyjściem, jakość spożywanego jedzenia także ma
          znaczenie. Najlepszym sposobem jest podmiana wy- soko kalorycznych i ubogich w wartości odżywcze produktów na
          pełnowartościowe szczególnie bogate w białko. Odrzucenie składników pokarmowych o niskim indeksie
          glikemicznym, które zapewniają mały poziom energii. Prawidłowy poziom tkanki tłuszczowej jest wyliczany na
          podstawie wieku oraz jej procentowej zawartości w organizmie.
        </Text>
        <Text>Prawidłowy poziom tkanki tłusczowej u mężczyzn (%):</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Wiek</TableCell>
                  <TableCell align="left">Niski</TableCell>
                  <TableCell align="left">Optymalny</TableCell>
                  <TableCell align="left">Nadmiar</TableCell>
                  <TableCell align="left">Alarm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">20-24</TableCell>
                  <TableCell align="left">&lt; 10,8</TableCell>
                  <TableCell align="left">14,9</TableCell>
                  <TableCell align="left">&gt; 19,0</TableCell>
                  <TableCell align="left">&gt; 23,3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">25-29</TableCell>
                  <TableCell align="left">&lt; 12,8</TableCell>
                  <TableCell align="left">16,5</TableCell>
                  <TableCell align="left">&gt; 20,3</TableCell>
                  <TableCell align="left">&gt; 24,3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">30-34</TableCell>
                  <TableCell align="left">&lt; 14,5</TableCell>
                  <TableCell align="left">18</TableCell>
                  <TableCell align="left">&gt; 21,5</TableCell>
                  <TableCell align="left">&gt; 25,2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">35-39</TableCell>
                  <TableCell align="left">&lt; 16,1</TableCell>
                  <TableCell align="left">19,3</TableCell>
                  <TableCell align="left">&gt; 22,6</TableCell>
                  <TableCell align="left">&gt; 26,1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">40-44</TableCell>
                  <TableCell align="left">&lt; 17,5</TableCell>
                  <TableCell align="left">20,5</TableCell>
                  <TableCell align="left">&gt; 23,6</TableCell>
                  <TableCell align="left">&gt; 26,9</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45-49</TableCell>
                  <TableCell align="left">&lt; 18,6</TableCell>
                  <TableCell align="left">21,5</TableCell>
                  <TableCell align="left">&gt; 24,5</TableCell>
                  <TableCell align="left">&gt; 27,6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">50-54</TableCell>
                  <TableCell align="left">&lt; 19,2</TableCell>
                  <TableCell align="left">22,1</TableCell>
                  <TableCell align="left">&gt; 25,1</TableCell>
                  <TableCell align="left">&gt; 28,2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">55-50</TableCell>
                  <TableCell align="left">&lt; 19,8</TableCell>
                  <TableCell align="left">22,7</TableCell>
                  <TableCell align="left">&gt; 25,6</TableCell>
                  <TableCell align="left">&gt; 28,7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">&gt; 60</TableCell>
                  <TableCell align="left">&lt; 20,2</TableCell>
                  <TableCell align="left">23,3</TableCell>
                  <TableCell align="left">&gt; 26,2</TableCell>
                  <TableCell align="left">&gt; 29,3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
        <Text>Prawidłowy poziom tkanki tłusczowej u kobiet (%):</Text>
        <Text>
          <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Wiek</TableCell>
                  <TableCell align="left">Niski</TableCell>
                  <TableCell align="left">Optymalny</TableCell>
                  <TableCell align="left">Nadmiar</TableCell>
                  <TableCell align="left">Alarm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: 'white' }}>
                <TableRow>
                  <TableCell align="left">20-24</TableCell>
                  <TableCell align="left">&lt; 18,2</TableCell>
                  <TableCell align="left">22,1</TableCell>
                  <TableCell align="left">&gt; 25,0</TableCell>
                  <TableCell align="left">&gt; 29,6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">25-29</TableCell>
                  <TableCell align="left">&lt; 18,9</TableCell>
                  <TableCell align="left">22,4</TableCell>
                  <TableCell align="left">&gt; 25,4</TableCell>
                  <TableCell align="left">&gt; 29,8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">30-34</TableCell>
                  <TableCell align="left">&lt; 18,7</TableCell>
                  <TableCell align="left">22,7</TableCell>
                  <TableCell align="left">&gt; 26,4</TableCell>
                  <TableCell align="left">&gt; 30,5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">35-39</TableCell>
                  <TableCell align="left">&lt; 21,1</TableCell>
                  <TableCell align="left">24</TableCell>
                  <TableCell align="left">&gt; 27,7</TableCell>
                  <TableCell align="left">&gt; 31,5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">40-44</TableCell>
                  <TableCell align="left">&lt; 22,6</TableCell>
                  <TableCell align="left">25,6</TableCell>
                  <TableCell align="left">&gt; 29,3</TableCell>
                  <TableCell align="left">&gt; 32,8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45-49</TableCell>
                  <TableCell align="left">&lt; 24,3</TableCell>
                  <TableCell align="left">27,3</TableCell>
                  <TableCell align="left">&gt; 30,9</TableCell>
                  <TableCell align="left">&gt; 34,1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">50-54</TableCell>
                  <TableCell align="left">&lt; 25,2</TableCell>
                  <TableCell align="left">28,2</TableCell>
                  <TableCell align="left">&gt; 31,8</TableCell>
                  <TableCell align="left">&gt; 25,1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">55-50</TableCell>
                  <TableCell align="left">&lt; 26,6</TableCell>
                  <TableCell align="left">29,7</TableCell>
                  <TableCell align="left">&gt; 33,1</TableCell>
                  <TableCell align="left">&gt; 36,2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">&gt; 60</TableCell>
                  <TableCell align="left">&lt; 27,6</TableCell>
                  <TableCell align="left">30,7</TableCell>
                  <TableCell align="left">&gt; 34,0</TableCell>
                  <TableCell align="left">&gt; 37,3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Text>
      </ViewWrapper>
    </>
  );
};

export default FatTissue;
