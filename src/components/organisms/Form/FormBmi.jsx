import { React, useState } from 'react';
import { StyledForm } from './Form.styles';
import PropTypes from 'prop-types';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { v4 as uuid } from 'uuid';

const errorMap = {
  heightIsToLow: 'Podany wzrost jest za mały!',
  heightIsToBig: 'Podany wzrost jest za duży!',
  weightIsToLow: 'Podana waga jest za mała!',
  weightIsToBig: 'Podana waga jest za duża!',
  weightIsEmpty: 'Musisz podać wagę!',
  heightIsEmpty: 'Musisz podać wzrost!',
};

const FormBmi = ({ change }) => {
  const [state, setState] = useState({ weight: '', height: '' });
  const [errorMessages, setErrorMessages] = useState([]);

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
      change(state);
      setState({ weight: '', height: '' });
      setErrorMessages([]);
    } else {
      setErrorMessages([...errors]);
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
      <Wrapper>
        <Button id="bmi-btn" type="submit" onClick={handleSubmit}>
          Oblicz
        </Button>
      </Wrapper>
      {!!errorMessages.length && errorMessages.map(message => <ErrorMessage key={message}>{message}</ErrorMessage>)}
    </StyledForm>
  );
};

FormBmi.propTypes = {
  change: PropTypes.func.isRequired,
};

export default FormBmi;
