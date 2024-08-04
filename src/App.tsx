import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/themes/commonstyle.css";
import LocationPrompt from "./components/location";
import NavBar from "./components/navBar";
import { checkLocationServices } from "./helpers"; // Ensure this is implemented and imported correctly
import AddNewUser from "./pages/AddNewUser";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Tracker from "./pages/tracker";
import { RootState } from './redux/store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(true);

  useEffect(() => {
    checkLocationServices((enabled) => {
      setLocationEnabled(enabled);
    });
  }, []);

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <>{element}</>;
  };

  const LocationBasedRoute = ({ element }: { element: React.ReactNode }) => {
  
    if (locationEnabled === false || locationEnabled === null) {
      return <Navigate to="/location-prompt" />;
    }
    return <>{element}</>;
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/add-user" element={<AddNewUser />} />
        <Route path="/" element={<Login />} />
        <Route path="/location-prompt" element={<LocationPrompt onEnableLocation={() => checkLocationServices(setLocationEnabled)} />} />
        <Route path="/*" element={
          <ProtectedRoute
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path="/home" element={<LocationBasedRoute element={<Home />} />} />
                  <Route path="/tracker" element={<LocationBasedRoute element={<Tracker />} />} />
                  <Route path="/profile" element={<LocationBasedRoute element={<Profile />} />} />
                </Routes>
              </>
            }
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
