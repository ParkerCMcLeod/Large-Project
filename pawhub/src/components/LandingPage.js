import React, { Component } from "react";
import HomePic from "../LandingPagePic.jpg";
import Logo from "../pawhub-logo-text.png";
import "./components.css";

class LandingPage extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  componentDidMount() {
    document.body.style.backgroundImage = `url(${HomePic})`;
    document.body.style.backgroundSize = '60%';
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
      <div
        style={{
        //   backgroundImage: `url(${HomePic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="LandingPageBackground"
      >
        <nav>
          <a href="index.html">
            <img className="NavigationImage" src={Logo} alt="Landing Page Picture" />
          </a>
          <div>
            <ul id="NavBar" className={this.state.clicked ? "#NavBar active" : "#NavBar"}>
              <li>
                <a href="index.html">Login/SignUp</a>
              </li>
              <li>
                <a href="index.html">Contact Us</a>
              </li>
            </ul>
          </div>

          <div id="mobile" onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
      </div>
    );
  }
}

export default LandingPage;
