import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../Hooks/useAuthentication';

const SingIn = () => {
  const { googleLoginHandler } = useAuthentication();

  const googleSignIn = async () => {
    googleLoginHandler();
  };

  return (
    <div className="w-[100%] bg-purple-600 absolute top-0 right-0 z-20 p-4 h-[100vh] flex flex-col gap-2 items-center justify-center">
      <button
        onClick={googleSignIn}
        className="text-white border-2 border-white p-2 rounded-lg"
      >
        Continue With Google
      </button>
      <Link to="/login">
        <button className="text-white border-2 border-white p-2 rounded-lg">
          Sign In With Email and Password
        </button>
      </Link>
      <Link to="/signup">
        <button className="text-white border-2 border-white p-2 rounded-lg">
          Register With Email and Password
        </button>
      </Link>
    </div>
  );
};

export default SingIn;
