import { ViewWrapper } from '../components/molecules/ViewWrapper/ViewWrapper';
import { StyledLink } from '../components/organisms/Navigation/Navigation.styles';
import { Title } from '../components/atoms/Title/Title';
import { Text } from '../components/atoms/Text/Text';
import UsersList from '../components/organisms/UsersList/UsersList';

const UserChoice = () => {
  return (
    <>
      <ViewWrapper>
        <Title>Lista użytkowników</Title>
        <Text>Wybierz użytkownika z listy, lub dodaj nowego.</Text>
        <UsersList />
        <StyledLink to="/dodaj-uzytkownika">Dodaj użytkownika</StyledLink>
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

export default UserChoice;
