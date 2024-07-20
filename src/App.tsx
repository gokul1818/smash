import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Tracker from "./pages/tracker";
import Login from "./pages/login";
import Landing from "./pages/landing";
import "./assets/themes/commonstyle.css"
import AddNewUser from "./pages/AddNewUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/add-user" element={<AddNewUser />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
