import { useContext, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import DeleteButton from '../../atoms/DeleteButton/DeleteButton';
import { Button } from '../../atoms/Button/Button';
import { Text } from '../../atoms/Text/Text';
import { Title } from '../../atoms/Title/Title';
import { UserName } from '../../atoms/UserName/UserName';
import { ViewWrapper } from '../../molecules/ViewWrapper/ViewWrapper';
import { StyledUser, StyledAverage, StyledInfo, Wrapper } from './UserListItem.styles';
import { UserShape } from '../../../types';
import { UsersContext } from '../../../providers/UsersProvider';
import { useNavigate } from 'react-router-dom';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const UsersListItem = ({ userData }) => {
  const { deleteUser, setCurrentUser } = useContext(UsersContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();
  const redirectToUserDashboard = () => {
    const path = '/panel-uzytkownika';

    navigate(path);
  };

  const handleLogin = () => {
    setCurrentUser(userData);

    redirectToUserDashboard();
  };
  return (
    <>
      <Wrapper>
        <StyledUser>
          <StyledAverage value={userData.gender}>{userData.gender === 'male' ? 'M' : 'K'}</StyledAverage>
          <StyledInfo>
            <UserName>
              {userData.firstName} {userData.lastName}
              <DeleteButton onClick={openModal} />
            </UserName>
            <Text>Rok urodzenia: {userData.year}</Text>
            <Button onClick={handleLogin}>Wybierz</Button>
          </StyledInfo>
        </StyledUser>
      </Wrapper>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles} contentLabel="Example Modal">
        <ViewWrapper>
          <Wrapper>
            <Title as="h2">Jesteś pewien, że chcesz usunąć tego użytkownika?</Title>
          </Wrapper>
          <Wrapper style={{ marginTop: '20px' }}>
            <Button onClick={() => deleteUser(userData.id)} style={{ marginRight: '10px' }}>
              Tak
            </Button>
            <Button onClick={closeModal}>Nie</Button>
          </Wrapper>
        </ViewWrapper>
      </Modal>
    </>
  );
};

UsersListItem.propTypes = {
  userData: PropTypes.shape(UserShape),
};

export default UsersListItem;
