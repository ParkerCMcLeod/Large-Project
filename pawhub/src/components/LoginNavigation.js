import React, { useState } from "react";
import Logo from "../images/pawhub-logo-text.png";
import LoginCard from "./LoginCard";
import SignUpCard from "./SignupCard";


function LoginNavigation() {
  const [clicked, setClicked] = useState(false);
  const [LoginPopup, setLoginPopup] = useState(false);
  const [SignupPopup, setSignupPopup] = useState(false);


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
      <SignUpCard trigger={SignupPopup} setTrigger={setSignupPopup} />

    </div>
  );
}

export default LoginNavigation;
