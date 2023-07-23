import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./profile.css";
import "./components.css";
import ProfilePicture from './ProfilePicture';

function ProfileCard({editUser, closeProfileCard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  const [apiData, setApiData] = useState([]);

  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchUsersReturnUsers', {
        params: query
      });
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editUser(name, email, username, password)
    // Handle form submission here
  }

  // what is usersreturnusers supposed to return?
  useEffect(() => {

      const getUserInfo = async () => {

      // let query = {"_id": "ObjectId('" + localStorage.getItem('currentUser') + "')"};
      // console.log(query);
      // let userVals = await searchUsersReturnUsers();
      // console.log("uservals:" + userVals);
    }

    getUserInfo();
  }, []);

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
