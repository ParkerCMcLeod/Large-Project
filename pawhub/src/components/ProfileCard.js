import React, { useState } from 'react';
import "./profile.css";
import "./components.css";
import ProfilePicture from './ProfilePicture';

function ProfileCard({ closeProfileCard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  }

  return (
    <div className='Profile-container'>
      <div className='Profile-inner'>
        <button className="close-btn" onClick={closeProfileCard}>✖</button>

        <form className="ProfileCard" onSubmit={handleSubmit}>
          <ProfilePicture/>

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
            type="text"
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
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileCard;
