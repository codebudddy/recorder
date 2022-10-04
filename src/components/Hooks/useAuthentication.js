import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../../firebase.config';
import { useAuthContext } from '../Hooks/useAuthContext';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const signupHandler = (email, password, userName, thumbnail) => {
    setError(null);
    setIsPending(true);
    createUserWithEmailAndPassword(authentication, email, password, userName)
      .then((res) => {
        updateProfile(res.user, { displayName: userName });
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  const googleLoginHandler = () => {
    setError(null);
    setIsPending(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
        navigate('/');
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  const signinHandler = (email, password) => {
    setError(null);
    setIsPending(true);
    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
        setIsPending(false);
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  const signoutHandler = () => {
    setIsPending(true);
    setError(null);
    signOut(authentication)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
        setIsPending(false);
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message);
          setIsPending(false);
        }
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    signupHandler,
    googleLoginHandler,
    signinHandler,
    signoutHandler,
    error,
    isPending,
  };
};
