import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";

function App() {
  const [apiData, setApiData] = useState([]);

  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/searchUsersReturnUsers', {
        params: query
      });
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchUsersReturnIDs = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/searchUsersReturnIDs', {
        params: query
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const addNewUser = async (newUser) => {
    try {
      let response = await axios.post('http://localhost:3001/addNewUser', newUser);
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      let response = await axios.put("http://localhost:3001/updateMatchingUsers", {
        listIDs,
        updatedUser,
      });
      if (response.status === 200 && response.message === "Data updated successfully") {
        setApiData((apiData) =>
          apiData.map((user) => (listIDs.includes(user._id) ? updatedUser : user))
        );
      }
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const deleteMatchingUsers = async (query) => {
    try {
      // Pass the query parameters using 'params'
      let response = await axios.delete('http://localhost:3001/deleteMatchingUsers', { params: query });
  
      // Assuming setApiData is a function in a React component to update state
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchPostsReturnPosts = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/searchPostsReturnPosts', {
        params: query
      });
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchPostsReturnIDs = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/searchPostsReturnIDs', {
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
      let response = await axios.post('http://localhost:3001/addNewPost', newPost);
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const updateAllMatchingPosts = async (listIDsPromise, updatedPost) => {
    try {
      const listIDs = await listIDsPromise;
      const response = await axios.put("http://localhost:3001/updateMatchingPosts", {
        listIDs,
        updatedPost,
      });
      if (response.status === 200 && response.message === "Data updated successfully") {
        setApiData((apiData) =>
          apiData.map((post) => (listIDs.includes(post._id) ? updatedPost : post))
        );
      }
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  const deleteMatchingPosts = async (query) => {
    try {
      let response = await axios.delete('http://localhost:3001/deleteMatchingPosts', { data: query });
      setApiData(response.data);
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
      await addNewUser(newUserExample);

      let query = { username: "IPlayFootball" };
      let userSearchResults = await searchUsersReturnUsers(query);
      let userSearchResultsIDs = await searchUsersReturnIDs(query);
      
      const updatedUserExample = {
        name: "Stephen MartinUPDATED",
        username: "IPlayFootballUPDATED",
        email: "football@ucf.eduUPDATED",
        password: "GoKnightsIPlayFootball42UPDATED",
        profilePicture: "https://example.com/profile.jpgUPDATED",
        friendList: [100000, 200000, 300000]
      };
      await updateAllMatchingUsers(userSearchResultsIDs, updatedUserExample);

      // delete all users matching a query
      query = { username: "IPlayFootballUPDATED" };
      await deleteMatchingUsers(query);
    };

    const examplePostsAPIFunctionality = async () => {
      const newPostExample = {
        numLikes: 8,
        text: "Hello World!",
        photo: "https://example.com/profile.jpg",
        userID: 42
      };
      await addNewPost(newPostExample);
      
      let query = { text: "Hello World!"}
      let postSearchResults = await searchPostsReturnPosts(query);
      let postSearchResultsIDs = await searchPostsReturnIDs(query);

      const updatedPostExample = {
        numLikes: 10000,
        text: "Hello World!UPDATED",
        photo: "https://example.com/profile.jpgUPDATED",
        userID: 42000
      };
      await updateAllMatchingPosts(postSearchResultsIDs, updatedPostExample);

      // delete all posts matching a query
      query = { numLikes: 10000 };
      await deleteMatchingPosts(query);
    };

    exampleUsersAPIFunctionality();
    examplePostsAPIFunctionality();
  }, []);

  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
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