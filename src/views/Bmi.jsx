import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeData } from '../helpers/localStorage';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import BmiTable from '../components/organisms/Table/BmiTable';
import FormBmi from '../components/organisms/Form/FormBmi';
import Bar from '../components/organisms/Bar/Bar';
import { Wrapper } from '../components/atoms/Wrapper/Wrapper';
import { UsersContext } from '../providers/UsersProvider';
import { ViewWrapper } from '../components/molecules/ViewWrapper/ViewWrapper';
import { Text } from '../components/atoms/Text/Text';
import { UnorderedList } from '../components/atoms/List/UnorderedList';
import { ListItem } from '../components/atoms/List/ListItem';

const Bmi = () => {
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  const { currentUser, users } = useContext(UsersContext);

  const [stateBmi, setStateBmi] = useState([]);
  const [valueBar, setValueBar] = useState({});

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueBmi && setStateBmi(user.valueBmi);
      }
    });
  }, []);

  useEffect(() => {
    const date = stateBmi.map(obj => obj.date);
    const bmi = stateBmi.map(obj => obj.bmi);
    const newData = {
      date,
      bmi,
    };

    setValueBar(newData);

    if (!users.length) return;
    storeData('users', users);
  }, [stateBmi]);

  const handleChangeBmi = value => {
    let heightInM = value.height / 100;
    value.bmi = (value.weight / (heightInM * heightInM)).toFixed(2);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueBmi = [...stateBmi, value];
      }
    });

    setStateBmi(prevState => [...prevState, value]);
  };

  const handleUndo = () => {
    const bmi = stateBmi.slice(0, -1);

    users.forEach(user => {
      if (user.id === currentUser.id) {
        user.valueBmi = [...bmi];
      }
    });

    setStateBmi(bmi);
  };

  return (
    <>
      <ViewWrapper>
        <Title>Wprowadź swoją wagę i wzrost</Title>
        <FormBmi change={handleChangeBmi} />
        {stateBmi.length ? <Bar labelData={valueBar.date} labelValue={valueBar.bmi ? valueBar.bmi : [0]} /> : ''}
        {stateBmi.length ? (
          <Wrapper>
            <BmiTable valueTable={stateBmi} />
          </Wrapper>
        ) : (
          ''
        )}
        {stateBmi.length ? (
          <Wrapper>
            <Button onClick={handleUndo}>Usuń ostatni wynik</Button>
          </Wrapper>
        ) : (
          ''
        )}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          <strong>BMI (Body Mass Index)</strong> to stosunek masy ciała do wzrostu. Pozwala na samodzielne określenie
          czy nasza waga jest w normie czy może jest za niska lub za wysoka. Jest podstawowym badaniem, które
          wykorzystują lekarze i dietetycy przeznaczonym dla ludzi zdrowych. W przypadku osoby uprawiającej sport i
          cechującej się zwiększoną ilością tkanki mięśniowej takie badanie nie będzie miarodajne, podobnie w przypadku
          kobiet w ciąży.
        </Text>
        <Text>Zakresy wartości BMI:</Text>
        <UnorderedList>
          <ListItem>&lt; 16 wychudzenie</ListItem>
          <ListItem>16 – 16,9 wychudzenie</ListItem>
          <ListItem>18,5 – 24,9 wartość prawidłowa</ListItem>
          <ListItem>25,0 – 29,9 nadwaga</ListItem>
          <ListItem>30,0 – 34,99 I stopień otyłości</ListItem>
          <ListItem>35,0 – 39,9 II stopień otyłości</ListItem>
          <ListItem>40 III stopień otyłości</ListItem>
        </UnorderedList>
      </ViewWrapper>
    </>
  );
};

export default Bmi;
