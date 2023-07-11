import React, { useState } from "react";
import "./components.css";
import SignUpCard from "./SignupCard";


function LoginCard(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleSignUpClick = () => {
        setShowSignUp(true);
        
    };


    return (props.trigger) ? (
        <div className="LoginSignUp-container">
            <div className="auth-form-container">
                <button 
                className="close-btn"
                onClick={() => props.setTrigger(false)}
                >✖</button>
                <form className="LoginCard">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="********" id="password" name="password" />
                    <button className="LoginSignUp-btn" type="submit">Log In</button>
                   
                </form>
                
            </div>
            
        </div>


    ) : "";
}


export default LoginCard;
