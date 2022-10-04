import React, { useState } from 'react';
import { useAuthentication } from '../Hooks/useAuthentication';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const { signupHandler } = useAuthentication();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      setTimeout(() => {
        setFormError(null);
      }, 10000);
      return;
    }
    await signupHandler(email, password, username);
    resetFields();
  };

  const resetFields = () => {
    setConfirmPassword('');
    setPassword('');
    setEmail('');
    setUsername('');
  };

  return (
    <div className="block m-auto text-center">
      <header>Regester</header>
      <div className="m-auto ">
        <div className="formGroup mt-4 pl-6">
          <label htmlFor="userName" className="flex  flex-col w-30 text-left">
            Username:
            <input
              type="text"
              name="userName"
              className="rounded-lg p-2 outline-none border-none w-64"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="formGroup mt-4 pl-6">
          <label htmlFor="userName" className="flex  flex-col w-30 text-left">
            Email:
            <input
              type="email"
              name="userName"
              className="rounded-lg p-2 outline-none border-none w-64"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="formGroup mt-4 pl-6">
          <label htmlFor="userName" className="flex  flex-col w-30 text-left">
            Password:
            <input
              type="password"
              name="password"
              className="rounded-lg p-2 outline-none border-none w-64"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="formGroup mt-4 pl-6">
          <label htmlFor="userName" className="flex  flex-col w-30 text-left">
            Confirm Password:
            <input
              type="password"
              name="password"
              className="rounded-lg p-2 outline-none border-none w-64"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="formGroup mt-4 pl-6">
          <label htmlFor="submit" className="flex  flex-col w-30 text-left">
            <input
              onClick={handleSubmit}
              type="submit"
              className="rounded-lg p-2 outline-none border-2 text-purple-900 border-purple-600 w-64"
              value="Register"
            />
          </label>
        </div>
        {formError && (
          <p className="bg-red-100 text-red-800 mx-6 mt-4 py-2 font-bold px-1 rounded-lg text-left">
            {formError}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
