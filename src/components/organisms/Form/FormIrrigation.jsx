import { React, useState } from 'react';
import { StyledForm } from './Form.styles';
import PropTypes from 'prop-types';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { v4 as uuid } from 'uuid';

const errorMap = {
  irrigationIsToLow: 'Podany poziom nawodnienia jest za mały!',
  irrigationIsToBig: 'Podany poziom nawodnienia jest za duży!',
  irrigationIsEmpty: 'Musisz podać poziom nawodnienia!',
};

const FormIrrigation = ({ change }) => {
  const [state, setState] = useState({ irrigation: '' });
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

    if (state.irrigation < 30 && state.irrigation !== '') {
      errors.push(errorMap.irrigationIsToLow);
      isFormValidSuccess = false;
    }

    if (state.irrigation > 80) {
      errors.push(errorMap.irrigationIsToBig);
      isFormValidSuccess = false;
    }

    if (state.irrigation === '') {
      errors.push(errorMap.irrigationIsEmpty);
      isFormValidSuccess = false;
    }

    if (isFormValidSuccess) {
      change(state);
      setState({ irrigation: '' });
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
        id="irrigation"
        label="Poziom nawodnienia (od 30 do 80%):"
        type="number"
        min="30"
        max="80"
        placeholder="np. 55"
        onChange={handleChange}
        name="irrigation"
        value={state.irrigation}
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

FormIrrigation.propTypes = {
  change: PropTypes.func.isRequired,
};

export default FormIrrigation;
