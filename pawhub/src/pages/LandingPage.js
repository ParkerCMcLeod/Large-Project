import React, { Component } from "react";
import HomePic from "../images/LandingPagePic.jpg";
import "../components/components.css";
import LoginNavigation from "../components/LoginNavigation";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignupCard";





class LandingPage extends Component {
 
  componentDidMount() {
    document.body.style.backgroundImage = `url(${HomePic})`;
    document.body.style.backgroundSize = '55%';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
    document.body.style.backgroundSize = null;
    document.body.style.backgroundPosition = null;
    document.body.style.backgroundRepeat = null;
    document.body.style.backgroundAttachment = null;


  }

  render() {
    return (
      <div className="LandingPageBackground">
        <LoginNavigation />
       
      </div>
    );
  }
}

export default LandingPage;
