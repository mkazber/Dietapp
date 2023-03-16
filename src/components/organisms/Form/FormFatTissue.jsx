import { React, useState } from 'react';
import { StyledForm } from './Form.styles';
import PropTypes from 'prop-types';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { v4 as uuid } from 'uuid';

const errorMap = {
  fatTissueIsToLow: 'Podana ilość tkanki tłuszczowej jest za mała!',
  fatTissueIsToBig: 'Podana ilość tkanki tłuszczowej jest za duża!',
  fatTissueIsEmpty: 'Musisz podać ilość tkanki tłusczowej!',
};

const FormFatTissue = ({ change }) => {
  const [state, setState] = useState({ fatTissue: '' });
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

    if (state.fatTissue < 1 && state.fatTissue !== '') {
      errors.push(errorMap.fatTissueIsToLow);
      isFormValidSuccess = false;
    }

    if (state.fatTissue > 40) {
      errors.push(errorMap.fatTissueIsToBig);
      isFormValidSuccess = false;
    }

    if (state.fatTissue === '') {
      errors.push(errorMap.fatTissueIsEmpty);
      isFormValidSuccess = false;
    }

    if (isFormValidSuccess) {
      change(state);
      setState({ fatTissue: '' });
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
        label="Ilość tkanki tłuszczowej (od 1 do 40%):"
        type="number"
        min="1"
        max="40"
        step="0.1"
        placeholder="np. 20"
        onChange={handleChange}
        name="fatTissue"
        value={state.fatTissue}
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

FormFatTissue.propTypes = {
  change: PropTypes.func.isRequired,
};

export default FormFatTissue;
