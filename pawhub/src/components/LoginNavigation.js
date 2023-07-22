import React, { useState } from "react";
import Logo from "../images/pawhub-logo-text.png";
import LoginCard from "./LoginCard";
import SignUpCard from "./SignupCard";
import axios from 'axios';

function LoginNavigation() {
  const [clicked, setClicked] = useState(false);
  const [LoginPopup, setLoginPopup] = useState(false);
  const [SignupPopup, setSignupPopup] = useState(false);

  const [apiData, setApiData] = useState([]);
  
  const addNewUser = async (newUser) => {
    try {
      let response = await axios.post('http://localhost:3001/api/addNewUser', newUser);
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  const addUser = async (name, username, email, password) => {

    const newUser = {
      "name": name,
      "username": username,
      "email": email,
      "password": password,
      "profilePicture": "https://example.com/profile.jpg",
      "friendList": []
    };

    await addNewUser(newUser);
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

      <LoginCard trigger={LoginPopup} setTrigger={setLoginPopup} />
      <SignUpCard addUser = {addUser} trigger={SignupPopup} setTrigger={setSignupPopup} />

    </div>
  );
}

export default LoginNavigation;
