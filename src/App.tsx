import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Tracker from "./pages/tracker";
import Login from "./pages/login";
import Landing from "./pages/landing";
import "./assets/themes/commonstyle.css"
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login hideNavBar />} />
        <Route path="/landing" element={<Landing hideNavBar />} />
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
