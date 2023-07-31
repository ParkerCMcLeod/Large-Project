import React from 'react';
import './Modal.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Modal = ({ onClose }) => {

  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('https://pawhub.space/api/searchUsersReturnUsers', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const deleteMatchingPosts = async (query) => {
    try {
      let response = await axios.delete('https://pawhub.space/api/deleteMatchingPosts', { data: query });
      return response.data;
      } catch (error) {
      console.error('Failed to delete data', error);
    }
  };
  
  const deleteMatchingUsers = async (query) => {
    try {
      // Pass the query parameters using 'params'
      let response = await axios.delete('https://pawhub.space/api/deleteMatchingUsers', { params: query });
  
      // Assuming setApiData is a function in a React component to update state
      return response.data;
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  const navigate = useNavigate();

  const deleteAccount = async() =>
  {
    let query =
    {
      "email": localStorage.getItem('email'),
    }     
    
    let userSearchResults = await searchUsersReturnUsers(query);
    console.log(userSearchResults);
    let userID = userSearchResults[0].userID;
    console.log(userID);

    let postQuery = 
    {
      "userID": userID
    }
    console.log(postQuery);

    let uName = userSearchResults[0].username;
    let userQuery =
    {
      "username": uName

    }
    console.log(userQuery);

    let userToDelete = await deleteMatchingUsers(userQuery);
    let postToDelete = await deleteMatchingPosts(postQuery);
    console.log("user", userToDelete);
    console.log("postList", postToDelete);


    localStorage.clear();
    console.log("logging out");
    navigate('/landingPage');
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p> This change is permanent, all your posts will be deleted</p>
        <button className = "x" onClick={onClose}>No</button>
        <button className = "x" onClick={deleteAccount}>Yes</button>

      </div>

    </div>
  );
};

export default Modal;