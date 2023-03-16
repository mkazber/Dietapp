import { createContext, useState, useEffect } from 'react';
import { storeData } from '../helpers/localStorage';

export const UsersContext = createContext({
  users: [],
  setUsers: () => {},
  currentUser: {},
  setCurrentUser: {},
  deleteUser: () => {},
});

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      setUsers(users);
    }
  }, []);

  const deleteUser = id => {
    const filteredUsers = users.filter(user => user.id !== id);
    setCurrentUser({});
    setUsers(filteredUsers);
    storeData('users', filteredUsers);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        deleteUser,
        setUsers,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
