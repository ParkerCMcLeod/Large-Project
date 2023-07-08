import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";



function Contact() {
    return (
        <div>
            <Navigation />
            <h1>
                Welcome to our Contact Page!
            </h1>
            <div>
                <ul className = "ContactHolder">
                    <li><Link to="/About">Profile</Link>
                        EEE
                    </li>
                    <li>
                        I
                    </li>
                </ul>
                
            </div>
        </div>
    )
}

export default Contact;