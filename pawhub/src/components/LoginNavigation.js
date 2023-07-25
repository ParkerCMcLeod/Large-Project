import React, { useState, useRef } from "react";
import Logo from "../images/pawhub-logo-text.png";
import LoginCard from "./LoginCard";
import SignUpCard from "./SignupCard";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function LoginNavigation() {
  const [clicked, setClicked] = useState(false);
  const [LoginPopup, setLoginPopup] = useState(false);
  const [SignupPopup, setSignupPopup] = useState(false);

  // lets me wait a stet amount of ms
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const nav = useNavigate();
  const [apiData, setApiData] = useState([]);

  // API USE FUNCTIONS
  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchUsersReturnUsers', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };


  const addNewUser = async (newUser) => {
    try {
      let response = await axios.post('http://localhost:3001/api/addNewUser', newUser);
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // ADDS USER JUST LIKE PARKER EXAMPLE
  const addUser = async (name, username, email, password, setSuccessMessage) => {

    const newUser = {
      "name": name,
      "username": username,
      "email": email,
      "password": password,
      "profilePicture": "https://example.com/profile.jpg",
      "friendList": []
    };
    let query = {"email": email}
    let anyUsers = await searchUsersReturnUsers(query)
    console.log(anyUsers);
    
    if(anyUsers === undefined)
    {
      await addNewUser(newUser);
      setSuccessMessage("Welcome to Pawhub!");

      await delay(2000);
      doLogin(email,password, null);

    }
    else
    {
      setSuccessMessage("An account already exists with that Email Address");
    }
   
  };

  // GOES TO HOME PAGE ON SUCCESSFUL SEARCH FROM DB 
  // OR DISPLAYS A MESSAGE IF INVALID EMAIL/PASSWORD
  const doLogin = async (email, password, setErrorValue) => {

    let query = { "email": email, "password": password};
    console.log(query);

    let currentUser = await searchUsersReturnUsers(query);
    if (currentUser === undefined)
    {
      console.log("InvalidLogin");
      setErrorValue("Invalid Email or password");

    }
    else
    {

      console.log(currentUser);
      localStorage.setItem('email', email);

      nav('/home');
    }
  }

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      <nav>
        <img className="NavigationImage" src={Logo} alt="Landing Page Picture" />
        <div>
          <ul id="NavBar" className={clicked ? "#NavBar active" : "#NavBar"}>
            <li>
              <button
                className="Login-SignUp-btn-styles"
                onClick={() => setLoginPopup(true)}>
                Login
              </button>
              

            </li>
            <li>
            <button
                className="Login-SignUp-btn-styles-background"
                onClick={() => setSignupPopup(true)}>
                SignUp
              </button>
            </li>
          </ul>

        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>

      <LoginCard doLogin = {doLogin} trigger={LoginPopup} setTrigger={setLoginPopup} />
      <SignUpCard addUser = {addUser} trigger={SignupPopup} setTrigger={setSignupPopup} />

    </div>
  );
}

export default LoginNavigation;
