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

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [apiData, setApiData] = useState([]);

  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('https://pawhub.space/api/searchUsersReturnUsers', {
        params: query
      });
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const searchUsersReturnIDs = async (query) => {
    try {
      let response = await axios.get('https://pawhub.space/api/searchUsersReturnIDs', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      let response = await axios.put("https://pawhub.space/api/updateMatchingUsers", {
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

  const editUser = async (name, username, email, password, pfp, setSuccessMessage) => {

    let query =
    {
      "email": localStorage.getItem('email'),
    }

    // console.log(pfp);

    let userSearchResults = await searchUsersReturnIDs(query);

    const updatedUser = {
      "name": name,
      "username": username,
      "email": email,
      "password": password,
      "profilePicture": pfp,
      "friendList": []
    };

    console.log(updatedUser);
    let response = await updateAllMatchingUsers(userSearchResults, updatedUser);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    setSuccessMessage('Profile Updated');
    await delay(2000);
    setSuccessMessage('');
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
    document.body.style.overflow = profileCardOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [profileCardOpen]);



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
