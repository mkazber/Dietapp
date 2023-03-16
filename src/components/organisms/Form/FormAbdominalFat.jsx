import { React, useState } from 'react';
import { StyledForm } from './Form.styles';
import PropTypes from 'prop-types';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { v4 as uuid } from 'uuid';

const errorMap = {
  abdominalFatIsToLow: 'Podany poziom tłuszczu brzusznego jest za mały!',
  abdominalFatIsToBig: 'Podany poziom tłuszczu brzusznego jest za duży!',
  abdominalFatIsEmpty: 'Musisz podać poziom tłuszczu brzusznego!',
};

const FormAbdominalFat = ({ change }) => {
  const [state, setState] = useState({ abdominalFat: '' });
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

    if (state.abdominalFat < 1 && state.abdominalFat !== '') {
      errors.push(errorMap.abdominalFatIsToLow);
      isFormValidSuccess = false;
    }

    if (state.abdominalFat > 59) {
      errors.push(errorMap.abdominalFatIsToBig);
      isFormValidSuccess = false;
    }

    if (state.abdominalFat === '') {
      errors.push(errorMap.abdominalFatIsEmpty);
      isFormValidSuccess = false;
    }

    if (isFormValidSuccess) {
      change(state);
      setState({ abdominalFat: '' });
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
        id="abdominalFat"
        label="Poziom tłuszczu brzusznego (od 1 do 59):"
        type="number"
        min="1"
        max="59"
        placeholder="np. 8"
        onChange={handleChange}
        name="abdominalFat"
        value={state.abdominalFat}
      />

      <Wrapper>
        <Button id="fatissue-btn" type="submit" onClick={handleSubmit}>
          Dodaj wynik
        </Button>
      </Wrapper>
      {!!errorMessages.length && errorMessages.map(message => <ErrorMessage key={message}>{message}</ErrorMessage>)}
    </StyledForm>
  );
};

FormAbdominalFat.propTypes = {
  change: PropTypes.func.isRequired,
};

export default FormAbdominalFat;
