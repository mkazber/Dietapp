import { React, useState } from 'react';
import { StyledForm } from './Form.styles';
import PropTypes from 'prop-types';
import FormField from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { Wrapper } from '../../atoms/Wrapper/Wrapper';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { v4 as uuid } from 'uuid';

const errorMap = {
  boneMineralizationMassIsToLow: 'Podany poziom mineralizacji kostnej jest za mały!',
  boneMineralizationMassIsToBig: 'Podany poziom mineralizacji kostnej jest za duży!',
  boneMineralizationMassIsEmpty: 'Musisz podać poziom mineralizacji kostnej!',
  weightIsToLow: 'Podana waga jest za mała!',
  weightIsToBig: 'Podana waga jest za duża!',
  weightIsEmpty: 'Musisz podać wagę!',
};

const FormBoneMineralizationMass = ({ change }) => {
  const [state, setState] = useState({ weight: '', boneMineralizationMass: '' });
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

    if (state.boneMineralizationMass < 1 && state.boneMineralizationMass !== '') {
      errors.push(errorMap.boneMineralizationMassIsToLow);
      isFormValidSuccess = false;
    }

    if (state.boneMineralizationMass > 5) {
      errors.push(errorMap.boneMineralizationMassIsToBig);
      isFormValidSuccess = false;
    }

    if (state.boneMineralizationMass === '') {
      errors.push(errorMap.boneMineralizationMassIsEmpty);
      isFormValidSuccess = false;
    }

    if (state.weight < 5 && state.weight !== '') {
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
      setState({ boneMineralizationMass: '', weight: '' });
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
        id="bonemineralizationmass"
        label="Poziom mineralizacji kostnej (od 1 do 5kg):"
        type="number"
        min="1"
        max="100"
        step="0.01"
        placeholder="np. 1.5"
        onChange={handleChange}
        name="boneMineralizationMass"
        value={state.boneMineralizationMass}
      />

      <Wrapper>
        <Button id="fatissue-btn" type="submit" onClick={handleSubmit}>
          Oblicz
        </Button>
      </Wrapper>
      {!!errorMessages.length && errorMessages.map(message => <ErrorMessage key={message}>{message}</ErrorMessage>)}
    </StyledForm>
  );
};

FormBoneMineralizationMass.propTypes = {
  change: PropTypes.func.isRequired,
};

export default FormBoneMineralizationMass;
