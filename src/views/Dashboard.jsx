import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewWrapper } from '../components/molecules/ViewWrapper/ViewWrapper';
import { Title } from '../components/atoms/Title/Title';
import { Text } from '../components/atoms/Text/Text';
import { UserName } from '../components/atoms/UserName/UserName';
import { StyledUser, StyledAverage, StyledInfo, Wrapper } from '../components/molecules/UsersList/UserListItem.styles';
import { UsersContext } from '../providers/UsersProvider';

const Dashboard = () => {
  const { currentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const redirectToUsersList = () => {
    const path = '/';
    navigate(path);
  };

  useEffect(() => {
    if (!currentUser.hasOwnProperty('id')) redirectToUsersList();
  }, []);

  return (
    <>
      <ViewWrapper>
        <Title>Wybrany użytkownik:</Title>
        <Wrapper>
          <StyledUser>
            <StyledAverage value={currentUser.gender}>{currentUser.gender === 'male' ? 'M' : 'K'}</StyledAverage>
            <StyledInfo>
              <UserName>
                {currentUser.firstName} {currentUser.lastName}
              </UserName>
              <Text>Rok urodzenia: {currentUser.year}</Text>
            </StyledInfo>
          </StyledUser>
        </Wrapper>
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

export default Dashboard;
