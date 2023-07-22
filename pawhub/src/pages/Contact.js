import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import stephen from "../images/Stephen.png";
import brandon from "../images/Brandon.png"
import jesus from "../images/DarthDogus.PNG"
import parker from "../images/Parker.png"
import nathan from "../images/Nathan.png"



function Contact() {
    return (
        <div className="pawprint-pattern ">
            <Navigation />

            <div className="TitleHolderLinks">
                <h1><a href = "https://github.com/ParkerCMcLeod/Large-Project" >Website GitHub</a> 
                <a href="https://github.com/rundex0/Large-Project-App" >App GitHub</a>
                </h1>
            </div>

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
                                
                                <h2><a href = "https://www.linkedin.com/in/jesus-carballosaa-925729283/"> LinkedIn</a>
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
                            
                            <h2><a href = "https://www.linkedin.com/in/brandon-holtzman-22155b1b7/"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>

                <div className= "IBox2">
                    <div className= "BG">
                        <img className = "pfp" src = {nathan}></img>
                        <div>
                            <h2>Nathan</h2>
                            <h2>Front End</h2>
                            
                            <h2><a href = "https://www.linkedin.com/in/nathan-carney-0633b2220/"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>

                <div className= "IBox">
                    <div className= "BG">
                        <img className = "pfp" src = {parker}></img>
                        <div>
                            <h2>Parker</h2>
                            <h2>API</h2>
                            
                            <h2><a href = "https://www.linkedin.com/in/parker-mcleod"> LinkedIn</a>
                            </h2>
                        </div>    
                    </div>   
                </div>
                
                <div className= "IBox">
                    <div className= "BG">
                        <img className = "pfp" src = {stephen}></img>
                        <div>
                            <h2>Stephen</h2>
                            <h2>Database</h2>
                            
                            <h2><a href = "https://app.podiumx.com/u/846522fa-6e36-4f73-892b-d40fce8fcf0d"> PodiumX</a>
                            </h2>
                        </div>    
                    </div>   
                </div>
                
            </div>
            

        </div>
    )
}

export default Contact;