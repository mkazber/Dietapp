import { useState, useEffect, useContext } from 'react';
import { Button } from '../components/atoms/Button/Button';
import { Title } from '../components/atoms/Title/Title';
import FormField from '../components/molecules/FormField/FormField';
import { Label } from '../components/atoms/Label/Label';
import { ErrorMessage } from '../components/atoms/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../components/atoms/SuccessMessage/SuccessMessage';
import { ViewWrapper, ViewRadioButton } from '../components/molecules/ViewWrapper/ViewWrapper';
import { storeData } from '../helpers/localStorage';
import { UsersContext } from '../providers/UsersProvider';
import { Text } from '../components/atoms/Text/Text';

const errorMap = {
  firstNameIsToShort: 'Podane imię jest za krótkie!',
  lastNameIsToShort: 'Podane Nazwisko jest za krótkie!',
  yearIsBiggerThanCurrent: 'Podany rok jeszcze się nie zaczął!',
  yearIsLowerThanSet: 'Podany rok jest za niski!',
};

const initialInputValue = {
  id: 1,
  firstName: '',
  lastName: '',
  year: '',
  gender: 'male',
};

const AddinputValue = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [gender, setGender] = useState('male');
  const [isFormValid, setIsFormValid] = useState(true);
  const [isVisibleSuccessMessage, setIsVisibleSuccessMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState(users);
  const [valueId, setValueId] = useState(0);

  useEffect(() => {
    if (!isFormValid) return;

    setUsers(user);
    storeData('users', user);
  }, [user]);

  useEffect(() => {
    const ids = user.map(user => user.id);

    if (!ids.length) return;

    const maxId = Math.max(...ids);
    const biggestId = maxId;

    setValueId(biggestId + 1);
  }, []);

  const handleFormValidity = () => {
    let isFormValidSuccess = true;
    const errors = [];

    if (inputValue.firstName.length < 2) {
      errors.push(errorMap.firstNameIsToShort);
      isFormValidSuccess = false;
    }

    if (inputValue.lastName.length < 2) {
      errors.push(errorMap.lastNameIsToShort);
      isFormValidSuccess = false;
    }

    const currentYear = new Date().getFullYear();

    if (inputValue.year > currentYear) {
      errors.push(errorMap.yearIsBiggerThanCurrent);
      isFormValidSuccess = false;
    }

    if (inputValue.year < 1900) {
      errors.push(errorMap.yearIsLowerThanSet);
      isFormValidSuccess = false;
    }

    if (isFormValidSuccess) {
      setIsVisibleSuccessMessage(true);
      setIsFormValid(true);
      setErrorMessages([]);

      handleIncrementId();
      handleUsersTable();
      setInputValue(initialInputValue);
      setGender('male');
    } else {
      setIsVisibleSuccessMessage(false);
      setErrorMessages([...errors]);
      setIsFormValid(false);
    }
  };

  const handleIncrementId = () => {
    setValueId(valueId + 1);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setInputValue(prevInputValue => {
      return {
        ...prevInputValue,
        id: valueId,
        [name]: value,
      };
    });
  };

  const handleUsersTable = () => {
    setUser(prevUsers => [...prevUsers, inputValue]);
  };

  const handleSubmitInputValue = e => {
    e.preventDefault();
    handleFormValidity();
  };

  return (
    <>
      <ViewWrapper as="form" onSubmit={handleSubmitInputValue}>
        <Title>Dodaj użytkownika</Title>
        <FormField label="Imię:" type="text" onChange={handleChange} name="firstName" value={inputValue.firstName} />
        <FormField label="Nazwisko:" type="text" onChange={handleChange} name="lastName" value={inputValue.lastName} />
        <FormField label="Rok urodzenia:" type="number" onChange={handleChange} name="year" value={inputValue.year} />
        <ViewRadioButton onChange={handleChange} value={inputValue.gender} name={gender}>
          <Label>Płeć:</Label>
          <FormField
            label="Mężczyzna"
            type="radio"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={e => setGender(e.target.value)}
          />
          <FormField
            label="Kobieta"
            className="radiobutton"
            type="radio"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={e => setGender(e.target.value)}
          />
        </ViewRadioButton>
        <Button type="submit">Dodaj użytkownika</Button>
        {!!errorMessages.length && errorMessages.map(message => <ErrorMessage key={message}>{message}</ErrorMessage>)}
        {isVisibleSuccessMessage && <SuccessMessage>Pomyślnie dodano użytkownika!</SuccessMessage>}
      </ViewWrapper>
      <ViewWrapper>
        <Text>
          Monitoruj stan swojego ciała oraz dowiedz się więcej na jego temat. Zdobądź dane przy użyciu elektronicznej
          wagi z analizą składu ciała. Co tydzień dodawaj i interpretuj swoje postępy. Życzymy powodzenia.
        </Text>
      </ViewWrapper>
    </>
  );
};

export default AddinputValue;
