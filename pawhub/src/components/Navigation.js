import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/pawhub-logo-text.png';
import './components.css';
import ProfileCard from './ProfileCard';
import SearchBar from './SearchBar';
import './searchbar.css';
import axios from 'axios';


const Navigation = () => {
  const [clicked, setClicked] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);

  const [apiData, setApiData] = useState([]);

  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchUsersReturnUsers', {
        params: query
      });
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      let response = await axios.put("http://localhost:3001/api/updateMatchingUsers", {
        listIDs,
        updatedUser,
      });
      if (response.status === 200 && response.message === "Data updated successfully") {
        setApiData((apiData) =>
          apiData.map((user) => (listIDs.includes(user._id) ? updatedUser : user))
        );
      } else {
        setApiData(response.data); // uses the data and rerenders relevant changes
      }
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  const editUser = async (name, username, email, password) => {

    let query = { _id: "ObjectId('64bc31cc232c95d234e4e5ee')" }
    console.log(query);
    let userSearchResultsIDs = await searchUsersReturnUsers(query);

    console.log(userSearchResultsIDs);

    const updatedUser = {
      "name": name,
      "username": username,
      "email": email,
      "password": password,
    };

    await updateAllMatchingUsers(userSearchResultsIDs, updatedUser);
  }

  const props = {

  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    console.log("logging out");
    navigate('/landingPage');
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleProfileClick = () => {
    setProfileCardOpen(true);
  };

  const closeProfileCard = () => {
    setProfileCardOpen(false);
  };

  const updateClickedState = () => {
    // Check the window width and update the clicked state accordingly
    setClicked(window.innerWidth <= 1209 ? clicked : false);
  };

  useEffect(() => {
    // Add event listeners for the resize event
    window.addEventListener('resize', updateClickedState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateClickedState);
    };
  }, [clicked]);

  useEffect(() => {
    // Add event listener to handle body scrolling and overlay
    document.body.style.overflow = clicked ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [clicked]);

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
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
            <button  className='Logout-btn' onClick={handleLogout}>Logout</button>
          </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i
            id="bar"
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        {clicked && <div id="overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)', zIndex: 997, marginTop: "139px" }}></div>}
      </nav>

      {profileCardOpen && <ProfileCard editUser = {editUser} closeProfileCard={closeProfileCard} />}
    </div>
  );
};

export default Navigation;
