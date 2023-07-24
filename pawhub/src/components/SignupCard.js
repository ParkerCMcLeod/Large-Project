import React, { useEffect, useState } from "react";
import "./components.css";

function SignUpCard(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [successMessage, setSuccessMessage]= useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    props.addUser(name, username, email, password, setSuccessMessage);
    
  };
  
  useEffect(() => {
    // Clear the fields when the component mounts or when the card is closed
    setEmail("");
    setPassword("");
    setName("");
    setUserName("");
    setSuccessMessage("");

  }, [props.trigger]); 

  return props.trigger ? (
    <div className="LoginSignUp-container">
      <div className="auth-form-container">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          ✖
        </button>
        <form className="LoginCard" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="full name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required

          />

          <label htmlFor="username">Username</label>
          <input
            type="username"
            placeholder="LiL_PuG"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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

          <button className="LoginSignUp-btn" type="submit">
            Sign Up
          </button>
          <label>{successMessage}</label>
        </form>
      </div>
    </div>
  ) : null;
}

export default SignUpCard;
