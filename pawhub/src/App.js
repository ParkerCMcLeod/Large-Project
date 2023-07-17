import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import GroupChat from "./pages/GroupChat";

function App() {
  const [apiData, setApiData] = useState([]);

  const searchUsersReturnUsers = async (query) => {
    try {
      const response = await axios.get('http://localhost:3001/searchUsersReturnUsers', {
        params: query
      });
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const searchUsersReturnIDs = async (query) => {
    try {
      const response = await axios.get('http://localhost:3001/searchUsersReturnIDs', {
        params: query
      });
      setApiData(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const addNewUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:3001/addNewUser', newUser);
      setApiData([...apiData, response.data]); // Add the new user to the local state
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      const { data } = await axios.put("http://localhost:3001/updateMatchingUsers", {
        listIDs,
        updatedUser,
      });

      // Update the local state to reflect the changes on the server
      if (data.status === 200 && data.message === "Data updated successfully") {
        setApiData((apiData) =>
          apiData.map((user) => (listIDs.includes(user._id) ? updatedUser : user))
        );
      }
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  const deleteMatchingUsers = async (query) => {
    try {
      await axios.delete(`http://localhost:3001/deleteMatchingUsers`);
      // Update the local state here if necessary
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newUserExample = {
        "name": "Stephen Martin",
        "username": "IPlayFootball",
        "email": "football@ucf.edu",
        "password": "GoKnightsIPlayFootball42",
        "profilePicture": "https://example.com/profile.jpg",
        "friendList": [100, 200, 300]
      };
      await addNewUser(newUserExample);

      // Specify the search criteria
      const query = { username: "IPlayFootball" };
      let results = await searchUsersReturnUsers(query);

      let listIDsPromise = searchUsersReturnIDs(query);

      const updatedUserExample = {
        "name": "UPDATED",
        "username": "UPDATED",
        "email": "UPDATED@ucf.edu",
        "password": "UPDATED",
        "profilePicture": "https://example.com/profile.jpg",
        "friendList": [1, 2, 3]
      };
      await updateAllMatchingUsers(listIDsPromise, updatedUserExample);

      await deleteMatchingUsers({ username: "UPDATED" });
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div>
      {/* Example render of api data */}
      {/* <div>
        {data.map((item) => (
          <div key={item._id}>{item.name}</div>
        ))}
      </div> */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<GroupChat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App