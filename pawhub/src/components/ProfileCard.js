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
  const [image, setImage] = useState(null);
  const [SuccessMessage, setSuccessMessage]= useState();

  const [apiData, setApiData] = useState([]);

  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchUsersReturnUsers', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const searchUsersReturnIDs = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchUsersReturnIDs', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editUser(name, username, email, password, image, setSuccessMessage)
    // Handle form submission here
  }

  // what is usersreturnusers supposed to return?
  useEffect(() => {

    // updates the profile card with the users information
    const getUserInfo = async () => {
      
      let query =
      {
        "email": localStorage.getItem('email'),
      }

      let userVals = await searchUsersReturnUsers(query);

      if (userVals !== undefined)
      {
        setEmail(userVals[0].email);
        setPassword(userVals[0].password);
        setName(userVals[0].name);
        setUserName(userVals[0].username);

        
        const data = userVals[0].profilePicture;
        console.log(data);
        
        if(data !== undefined)
        {
          setImage(data);
        }


      }
    }

    getUserInfo();
  }, []);

  return (
    <div className='Profile-container'>
      <div className='Profile-inner'>
        <button className="close-btn" onClick={closeProfileCard}>✖</button>

        <form className="ProfileCard" onSubmit={handleSubmit}>
          <ProfilePicture image = {image} setImage={setImage}/>

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
          <label> 
          {SuccessMessage}
          </label>
        </form>
      </div>
    </div>
  );
}



export default ProfileCard;
