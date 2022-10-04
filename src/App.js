import { Route, Routes } from 'react-router-dom';
import AddHandler from './components/AddHandler';
import Home from './components/Home';
import JobDetails from './components/JobDetails';
import Navbar from './components/Navbar';
import StatusDetails from './components/StatusDetails';

import SingIn from './components/Authentication/SingIn';
import { useAuthContext } from './components/./Hooks/useAuthContext';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Footer from './components/Footer';

function App() {
  const { user: userDetails, authIsReady } = useAuthContext();
  return (
    <div>
      {authIsReady && (
        <div>
          <div className="App w-[100vw h-[100vh] bg-purple-200 flex flex-col">
            <Navbar user={userDetails} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/status/:status" element={<StatusDetails />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/add"
                element={
                  userDetails?.email === 'bitdoctrine@gmail.com' ? (
                    <AddHandler />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route
                path="/signin"
                element={userDetails ? <Home /> : <SingIn />}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
