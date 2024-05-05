import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import AppRoutes from './routes/AppRoutes';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import Signup from './pages/Signup';
import UserDetails from './components/UserDetails';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


const App = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn === "true" ? <UserDetails /> : <Login />}
        />
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path='/userhome' element={<UserHome />} /> */}
        <Route path='/userhome' element={<UserDetails />} />
        < Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
