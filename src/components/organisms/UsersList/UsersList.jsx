import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { StyledList } from './UsersList.styles';
import UsersListItem from '../../molecules/UsersList/UserListItem';
import { UserShape } from '../../../types';
import { UsersContext } from '../../../providers/UsersProvider';

const UsersList = () => {
  const { users } = useContext(UsersContext);
  return (
    <>
      <StyledList>
        {users.map(userData => (
          <UsersListItem key={userData.id} userData={userData} />
        ))}
      </StyledList>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)),
  deleteUser: PropTypes.func,
};

export default UsersList;
