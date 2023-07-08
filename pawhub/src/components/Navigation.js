import React, { Component } from "react";
import logo from "../images/pawhub-logo-text.png";
import "./components.css";
import { Link } from "react-router-dom";

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
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/home">Profile</Link></li>
                        <li><Link to="/chat">Group Chat</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
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