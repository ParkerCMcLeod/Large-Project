import React, { useState, useRef } from "react";
import "./components.css";


function LoginCard(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorValue, setErrorValue]= useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.doLogin(email,password, setErrorValue);
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
                <form className="LoginCard" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email" 
                    name="email" 
                    value ={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    placeholder="********" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button className="LoginSignUp-btn" type="submit" >Log In</button>
                    <label> 
                    {errorValue}</label>
                </form>
            </div>
        </div>
    ) : "";
}


export default LoginCard;
