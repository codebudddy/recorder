import React, { useState } from 'react';
import { useAuthentication } from '../Hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginError, setLoginError } = useState(null);
  const { signinHandler, error } = useAuthentication();

  const handleSubmit = async () => {
    signinHandler(email, password);
    if (error) {
      setLoginError(error);
    }
  };

  return (
    <div className="pl-6 pt-6">
      <header className="font-bold text-purple-600">Login To Continue</header>
      <div className="">
        <div className="form-group mt-3">
          <label htmlFor="email" className="flex flex-col">
            Email:{' '}
            <input
              type="email"
              name="email"
              required
              className="w-80 p-2 rounded-lg border-none outline-none mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email" className="flex flex-col">
            Password:{' '}
            <input
              type="password"
              name="password"
              required
              className="w-80 p-2 rounded-lg border-none outline-none mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <input
            type="button"
            className="mt-3 px-2 py-1 cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-500 ease-in-out border-2
             border-purple-600 text-purple-600 rounded-lg"
            value="Login"
            onClick={handleSubmit}
          />
        </div>
        {loginError && <p className="text-red-900 bg-red-300">{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;
