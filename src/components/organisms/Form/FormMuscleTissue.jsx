import { React, useState } from 'react';
import { StyledForm } from './Form.styles';
import PropTypes from 'prop-types';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { v4 as uuid } from 'uuid';

const errorMap = {
  muscleTissueIsToLow: 'Podana ilość tkanki mięśniowej jest za mała!',
  muscleTissueIsToBig: 'Podana ilość tkanki mięśniowej jest za duża!',
  muscleTissueIsEmpty: 'Musisz podać ilość tkanki mięśniowej!',
};

const FormMuscleTissue = ({ change }) => {
  const [state, setState] = useState({ muscleTissue: '' });
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

    if (state.muscleTissue < 1 && state.muscleTissue !== '') {
      errors.push(errorMap.muscleTissueIsToLow);
      isFormValidSuccess = false;
    }

    if (state.muscleTissue > 100) {
      errors.push(errorMap.muscleTissueIsToBig);
      isFormValidSuccess = false;
    }

    if (state.muscleTissue === '') {
      errors.push(errorMap.muscleTissueIsEmpty);
      isFormValidSuccess = false;
    }

    if (isFormValidSuccess) {
      change(state);
      setState({ muscleTissue: '' });
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
        id="fattissue"
        label="Ilość tkanki mięśniowej (od 1 do 100%):"
        type="number"
        min="1"
        max="100"
        placeholder="np. 40"
        onChange={handleChange}
        name="muscleTissue"
        value={state.muscleTissue}
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

FormMuscleTissue.propTypes = {
  change: PropTypes.func.isRequired,
};

export default FormMuscleTissue;
