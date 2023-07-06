import React from "react";
import HomePic from "../LandingPagePic.jpg"
import { Component } from "react";


class LandingPage extends Component  {
    state = {clicked: false};
    handleClick = () =>{
        this.setState({clicked:!this.state.clicked})
    }
    render () {
    return(
        <div>
            <nav>
                <a href="index.html">
                <img className="NavigationImage" src={HomePic} alt="Landing Page Picture"/>
                </a>
                <div>
                    <ul id="NavBar" className={this.state.clicked ? "#NavBar active" : "#NavBar"}>
                        <li><a href="index.html">Login/SignUp</a></li>
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


export default LandingPage;