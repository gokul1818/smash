import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/themes/commonstyle.css";
import NavBar from "./components/navBar";
import AddNewUser from "./pages/AddNewUser";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Tracker from "./pages/tracker";
import { RootState } from './redux/store';
import LocationPrompt from "./components/location";

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Check if location services are enabled
  const checkLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true),
        () => setLocationEnabled(false)
      );
    } else {
      setLocationEnabled(false);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />; // Redirect to login if not authenticated
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
        <Route path="/*" element={
          <ProtectedRoute
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path="/home" element={
                    locationEnabled ? <Home /> : <Navigate to="/location-prompt" />
                  } /> {/* Redirect to location prompt if location is not enabled */}
                  <Route path="/tracker" element={
                    locationEnabled ? <Tracker /> : <Navigate to="/location-prompt" />
                  } /> {/* Redirect to location prompt if location is not enabled */}
                  <Route path="/profile" element={
                    locationEnabled ? <Profile /> : <Navigate to="/location-prompt" />
                  } /> {/* Redirect to location prompt if location is not enabled */}
                  <Route path="/location-prompt" element={<LocationPrompt onEnableLocation={checkLocation} />} /> {/* Location prompt route */}
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
