import React from "react";
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
const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

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
                  <Route path="/home" element={<Home />} /> {/* Protected route for home */}
                  <Route path="/tracker" element={<Tracker />} /> {/* Protected route for tracker */}
                  <Route path="/profile" element={<Profile />} /> {/* Protected route for profile */}
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
