import React, { useState } from "react";
import "./components.css";

function SignUpCard(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    props.addUser(name, username, email, password);
    // Handle form submission here
  };

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
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="username">Username</label>
          <input
            type="username"
            placeholder="LiL_PuG"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="LoginSignUp-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default SignUpCard;
