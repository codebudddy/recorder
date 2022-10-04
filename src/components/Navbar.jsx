import React, { useState } from 'react';
import { BsMenuButtonWide } from 'react-icons/bs';
import { MdCloseFullscreen } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '././Hooks/useAuthContext';
import { useAuthentication } from './Hooks/useAuthentication';

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { user, dispatch } = useAuthContext();

  const { signoutHandler } = useAuthentication();

  const signout = async () => {
    await signoutHandler();
    dispatch({ type: 'LOGOUT' });
    navigate('/signin');
  };

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-2 ">
      <div className="text-purple-600 font-bold text-2xl ">Recorder</div>
      <div>
        {user && (
          <p className="text-purple-900 font-bold">
            Hello <span>{user.displayName}</span>
          </p>
        )}
      </div>
      <div className=" sm:hidden">
        <div
          className="menu w-8 h-8 transition-all duration-500 ease-in-out relative"
          onClick={handleMenu}
        >
          {!menu ? (
            <div className="flex items-center justify-center mt-2">
              <BsMenuButtonWide className=" text-purple-600 cursor-pointer" />
            </div>
          ) : (
            <div className="menu_container absolute  top-0 right-0 w-60 border-l-2 pl-2 bg-purple-100">
              <header className="w-full flex justify-between items-center">
                <h2 className="text-purple-600">Recorder</h2>
                <MdCloseFullscreen className="text-purple-600 cursor-pointer mt-2 mr-3" />
              </header>

              <ul className="mt-5 w-full text-blue-300">
                <li className='className="mt-1 p-1 underline w-full bg-white  rounded-md mb-3 text-purple-600 uppercase"'>
                  <Link to="/">Home</Link>
                </li>
                {user?.email === 'bitdoctrine@gmail.com' && (
                  <li className="mt-1 p-1 underline w-full bg-white  rounded-md mb-3 text-purple-600 uppercase">
                    <Link to="/add"> Add</Link>
                  </li>
                )}
                <li
                  onClick={signout}
                  className="mt-1 p-1 underline w-full bg-white  rounded-md mb-3 text-purple-600 uppercase"
                >
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <ul className="hidden sm:flex gap-3 text-purple-600 font-semibold underline justify-between items-center mr-4">
        <li>
          <button onClick={signout}>Logout</button>
        </li>
        {user?.email === 'bitdoctrine@gmail.com' && (
          <li>
            <Link to="/add">Add</Link>
          </li>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
