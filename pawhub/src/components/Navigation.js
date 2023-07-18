import React, { useState } from 'react';
import logo from "../images/pawhub-logo-text.png";
import "./components.css";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import SearchBar from './SearchBar';
import "./searchbar.css";

const Navigation = () => {
  const [clicked, setClicked] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleProfileClick = () => {
    setProfileCardOpen(true);
  };

  const closeProfileCard = () => {
    setProfileCardOpen(false);
  };

  return (
    <div className="Navigation">
      <nav>
        <div className="navigation-logo-search">
          <Link to="/home">
            <img className="NavigationImage" src={logo} alt="Logo" />
          </Link>
          <SearchBar
            handleProfileClick={handleProfileClick}
            closeProfileCard={closeProfileCard}
          />
        </div>
        
        <div>
          <ul id="NavBar" className={clicked ? "active" : ""}>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <button onClick={handleProfileClick}>Profile</button>
            </li>
            <li>
              <Link to="/chat">Group Chat</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i
            id="bar"
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>

      {profileCardOpen && <ProfileCard closeProfileCard={closeProfileCard} />}
    </div>
  );
};

export default Navigation;
