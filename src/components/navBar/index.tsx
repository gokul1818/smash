import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/images/home.png";
import trackerIcon from "../../assets/images/tracker.png";
import profileIcon from "../../assets/images/profile.png";
import "./styles.css";

const NavBar: React.FC = () => {
  return (
      <div className="navbar-list">
          <Link to="/home">
            <img src={homeIcon} alt="Home" className="navbar-icon" />
          </Link>
          <Link to="/about">
            <img src={trackerIcon} alt="Tracker" className="navbar-icon" />
          </Link>
          <Link to="/profile">
            <img src={profileIcon} alt="Profile" className="navbar-icon" />
          </Link>
      </div>
  );
};

export default NavBar;
