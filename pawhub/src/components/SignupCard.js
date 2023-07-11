import React, {useState, useRef} from "react";
import "./components.css";


function SignUpCard(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (props.trigger) ? (

        <div className="LoginSignUp-container">
            <div className="auth-form-container">
            <button  className="close-btn" onClick={() => {props.setTrigger(false)}}>✖</button>
            <form className="LoginCard">
                <label htmlFor="name">Name</label>
                <input type="name" placeholder="full name" id="name" name="name" />
                
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="********" id="password" name="password" />
                
                <button className="LoginSignUp-btn" type="submit">Sign Up</button>
                
            </form>
        </div>


        </div>
        

    ) : "";
}

export default SignUpCard;