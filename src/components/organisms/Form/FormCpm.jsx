import { React, useState, useContext } from 'react';
import { StyledForm } from './Form.styles';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { Title } from '../../atoms/Title/Title';
import { UsersContext } from '../../../providers/UsersProvider';
import { Label } from '../../atoms/Label/Label';
import { v4 as uuid } from 'uuid';

const errorMap = {
  heightIsToLow: 'Podany wzrost jest za mały!',
  heightIsToBig: 'Podany wzrost jest za duży!',
  heightIsEmpty: 'Musisz podać wzrost!',
  weightIsToLow: 'Podana waga jest za mała!',
  weightIsToBig: 'Podana waga jest za duża!',
  weightIsEmpty: 'Musisz podać wagę!',
};

const FormCpm = () => {
  const { currentUser } = useContext(UsersContext);
  const [state, setState] = useState({ height: '', weight: '' });
  const [cpm, setCpm] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);
  const [pal, setPal] = useState(1.2);

  const calcCpm = () => {
    const age = new Date().getFullYear() - currentUser.year;
    let bmr = 0;

    if (currentUser.gender === 'male') {
      bmr = (66 + 13.7 * +state.weight + 5 * +state.height - 6.8 * age) * +pal;
    } else {
      bmr = (655 + 9.6 * +state.weight + 1.8 * state.height - 4.7 * age) * +pal;
    }

    return Math.round(bmr);
  };

  const handleChange = e => {
    let { value, name } = e.target;

    const date = new Date().toLocaleString().split(',')[0];

    const rndId = uuid();

    setState(prevState => {
      return {
        rndId,
        ...prevState,
        date,
        [name]: value,
      };
    });
  };

  const handleFormValidity = () => {
    let isFormValidSuccess = true;
    const errors = [];

    if (state.height < 30 && state.height !== '') {
      errors.push(errorMap.heightIsToLow);
      isFormValidSuccess = false;
    }

    if (state.height > 500) {
      errors.push(errorMap.heightIsToBig);
      isFormValidSuccess = false;
    }

    if (state.height === '') {
      errors.push(errorMap.heightIsEmpty);
      isFormValidSuccess = false;
    }

    if (state.weight < 2 && state.weight !== '') {
      errors.push(errorMap.weightIsToLow);
      isFormValidSuccess = false;
    }

    if (state.weight > 500) {
      errors.push(errorMap.weightIsToBig);
      isFormValidSuccess = false;
    }

    if (state.weight === '') {
      errors.push(errorMap.weightIsEmpty);
      isFormValidSuccess = false;
    }

    if (isFormValidSuccess) {
      setState({ height: '', weight: '' });
      setCpm(calcCpm());
      setErrorMessages([]);
    } else {
      setErrorMessages([...errors]);
      setCpm(0);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleFormValidity();
  };

  return (
    <StyledForm autoComplete="off">
      <FormField
        id="weight"
        label="Waga:"
        type="number"
        min="1"
        max="500"
        placeholder="np. 50"
        onChange={handleChange}
        name="weight"
        value={state.weight}
      />

      <FormField
        id="height"
        label="Wzrost:"
        type="number"
        min="30"
        max="500"
        placeholder="np. 176"
        onChange={handleChange}
        name="height"
        value={state.height}
      />
      <Label>
        Aktywność:
        <FormField
          id="Pal-1-2"
          label="Brak aktywności fizycznej / brak aktywności zawodowej, chory, leżący."
          type="radio"
          onChange={handleChange}
          name="Pal"
          value={1.2}
        />
        <FormField
          id="Pal-1-4"
          label="Lekka aktywność / Pracownik biurowy, którego aktywność związana jest wyłącznie z obowiązkami domowymi."
          type="radio"
          onChange={e => setPal(e.target.value)}
          name="Pal"
          value={1.4}
        />
        <FormField
          id="Pal-1-6"
          label="Średnia aktywność / Pracownik biurowy, trenujący 2-3 razy w tygodniu przez minimum godzinę."
          type="radio"
          onChange={e => setPal(e.target.value)}
          name="Pal"
          value="1.6"
        />
        <FormField
          id="Pal-1-8"
          label="Wysoka aktywność / Pracownik biurowy, trenujący 3-4 razy w tygodniu przez minimum godzinę."
          type="radio"
          onChange={e => setPal(e.target.value)}
          name="Pal"
          value="1.8"
        />
        <FormField
          id="Pal-2"
          label="Bardzo wysoka aktywność / Zawodowy sportowiec, trenujący minimum 6 godzin tygodniowo lub osoba ciężko pracująca fizycznie."
          type="radio"
          onChange={e => setPal(e.target.value)}
          name="Pal"
          value="2"
        />
      </Label>

      <Wrapper>
        <Button id="cpm-btn" type="submit" onClick={handleSubmit}>
          Oblicz
        </Button>
      </Wrapper>
      <Wrapper>{cpm !== 0 && <Title>CPM wynosi {cpm} kcal</Title>}</Wrapper>
      {!!errorMessages.length && errorMessages.map(message => <ErrorMessage key={message}>{message}</ErrorMessage>)}
    </StyledForm>
  );
};

export default FormCpm;
