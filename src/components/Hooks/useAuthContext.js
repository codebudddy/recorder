import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const usercontext = useContext(AuthContext);

  if (!usercontext) {
    throw Error('User Context must only be used in a user context provider');
  }

  return usercontext;
};
