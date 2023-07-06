import React, { Component } from "react";
import logo from "../pawhub-logo-text.png";
import "./components.css";

class Navigation extends Component  {
    state = {clicked: false};
    handleClick = () =>{
        this.setState({clicked:!this.state.clicked})
    }
    render () {
    return(
        <div>
            <nav>
                <a href="index.html">
                <img className="NavigationImage" src={logo} alt="Logo" />
                </a>
                <div>
                    <ul id="NavBar" className={this.state.clicked ? "#NavBar active" : "#NavBar"}>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html">Profile</a></li>
                        <li><a href="index.html">Group Chat</a></li>
                        <li><a href="index.html">Contact Us</a></li>
                    </ul>
                </div>

                <div id="mobile" onClick={this.handleClick}>
                    <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                
            </nav>
        </div>
     )
    }
}


export default Navigation;