import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import SearchBar from "./components/SearchBar";

function App() {
  const searchUsersReturnUsers = async (query) => {
    try {
      // Ensure the 'userID' property is sent as a number
      if (query.userID) {
        query.userID = parseInt(query.userID);
      }

      let response = await axios.get('http://localhost:3001/api/searchUsersReturnUsers', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
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

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS... Yeah... I'm takin dat :/
  const addNewUser = async (newUser) => {
    try {
      let response = await axios.post('http://localhost:3001/api/addNewUser', newUser);
      return response.data;
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      let response = await axios.put("http://localhost:3001/api/updateMatchingUsers", {
        listIDs,
        updatedUser,
      });
      if (response.status === 200 && response.message === "Data updated successfully") {
        return apiData.map((user) => (listIDs.includes(user._id) ? updatedUser : user));
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const deleteMatchingUsers = async (query) => {
    try {
      // Pass the query parameters using 'params'
      let response = await axios.delete('http://localhost:3001/api/deleteMatchingUsers', { params: query });
  
      // Assuming setApiData is a function in a React component to update state
      return response.data;
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchPostsReturnPosts = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchPostsReturnPosts', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchPostsReturnIDs = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/api/searchPostsReturnIDs', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const addNewPost = async (newPost) => {
    try {
      let response = await axios.post('http://localhost:3001/api/addNewPost', newPost);
      return response.data;
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const updateAllMatchingPosts = async (listIDsPromise, updatedPost) => {
    try {
      const listIDs = await listIDsPromise;
      const response = await axios.put("http://localhost:3001/api/updateMatchingPosts", {
        listIDs,
        updatedPost,
      });
      if (response.status === 200 && response.message === "Data updated successfully") {
        return apiData.map((user) => (listIDs.includes(user._id) ? updatedUser : user));
      } else {
        return response.data;
    }
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  const deleteMatchingPosts = async (query) => {
    try {
      let response = await axios.delete('http://localhost:3001/api/deleteMatchingPosts', { data: query });
      return response.data;
      } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  useEffect(() => {
    const exampleUsersAPIFunctionality = async () => {

      const newUserExample = {
        name: "Stephen Martin",
        username: "IPlayFootball",
        email: "football@ucf.edu",
        password: "GoKnightsIPlayFootball42",
        profilePicture: "https://example.com/profile.jpg",
        friendList: [1, 2, 3]
      };

      let response = await addNewUser(newUserExample);

      let query = { username: "IPlayFootball" };
      let userSearchResultsUsers = await searchUsersReturnUsers(query);
      let userSearchResultsIDs = await searchUsersReturnIDs(query);

      const updatedUserExample = {
        name: "Stephen MartinUPDATED",
        username: "IPlayFootballUPDATED",
        email: "football@ucf.eduUPDATED",
        password: "GoKnightsIPlayFootball42UPDATED",
        profilePicture: "https://example.com/profile.jpgUPDATED",
        friendList: [100000, 200000, 300000]
      };

      response = await updateAllMatchingUsers(userSearchResultsIDs, updatedUserExample);

      // delete all users matching a query
      query = { username: "IPlayFootballUPDATED" };
      response = await deleteMatchingUsers(query);

    };

    const examplePostsAPIFunctionality = async () => {
      const newPostExample = {
        numLikes: 8,
        text: "Hello World!",
        photo: "https://example.com/profile.jpg",
        userID: 42
      };
      let response = await addNewPost(newPostExample);
      console.log(response);
      let query = { text: "Hello World!"}
      let postSearchResultsPosts = await searchPostsReturnPosts(query);
      let postSearchResultsIDs = await searchPostsReturnIDs(query);

      const updatedPostExample = {
        numLikes: 10000,
        text: "Hello World!UPDATED",
        photo: "https://example.com/profile.jpgUPDATED",
        userID: 42000
      };

      response = await updateAllMatchingPosts(postSearchResultsIDs, updatedPostExample);

      // delete all posts matching a query
      query = { numLikes: 10000 };
      response = await deleteMatchingPosts(query);
  };


    exampleUsersAPIFunctionality();
    examplePostsAPIFunctionality();
  }, []);

  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;