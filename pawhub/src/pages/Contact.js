import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import angery from "../images/Angery.PNG";
import brandon from "../images/Brandon.jpg"
import jesus from "../images/DarthDogus.PNG"
import pug from "../images/Pug.jpg"
import sleepy from "../images/Meow.jpg"



function Contact() {
    return (
        <div className="pawprint-pattern">
            <Navigation />

            <div className="TitleHolder">
                <h1> Meet Our Devs
                </h1>
            </div>

            <div className="BoxHolder">
                <div className= "IBox2">
                        <div className= "BG">
                            <img className = "pfp" src = {jesus}></img>
                            <div>
                                <h2>Jesus</h2>
                                <h2>Front End</h2>
                                <h2><a href = "https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F%3Ftrk%3Dguest_homepage-basic_nav-header-logo"> LinkedIn</a>
                                </h2>
                            </div>    
                        </div>   
                </div>
                
                <div className= "IBox2">
                    <div className= "BG">
                        <img className = "pfp" src = {brandon}></img>
                        <div>
                            <h2>Brandon</h2>
                            <h2>Project Manager</h2>
                            <h2><a href = "https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F%3Ftrk%3Dguest_homepage-basic_nav-header-logo"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>

                <div className= "IBox2">
                    <div className= "BG">
                        <img className = "pfp" src = {angery}></img>
                        <div>
                            <h2>Nathan</h2>
                            <h2>Front End</h2>
                            <h2><a href = "https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F%3Ftrk%3Dguest_homepage-basic_nav-header-logo"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>

                <div className= "IBox">
                    <div className= "BG">
                        <img className = "pfp" src = {pug}></img>
                        <div>
                            <h2>Parker</h2>
                            <h2>API</h2>
                            <h2><a href = "https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F%3Ftrk%3Dguest_homepage-basic_nav-header-logo"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>
                
                <div className= "IBox">
                    <div className= "BG">
                        <img className = "pfp" src = {sleepy}></img>
                        <div>
                            <h2>Stephen</h2>
                            <h2>Database</h2>
                            <h2><a href = "https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2F%3Ftrk%3Dguest_homepage-basic_nav-header-logo"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>
                
            </div>
            

        </div>
    )
}

export default Contact;