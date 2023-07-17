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

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api');
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const searchDataGetDocumnets = async (query) => {
    try {
      const response = await axios.get('http://localhost:3001/search', {
        params: query
      });
      setApiData(response.data);
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const searchDataGetIDs = async (query) => {
    try {
      const response = await axios.get('http://localhost:3001/searchID', {
        params: query
      });
      setApiData(response.data);
      return response.data
    } catch (error) {
      console.error('Failed to search data', error);
    }
  };

  const addData = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:3001/api', newUser);
      setApiData([...apiData, response.data]); // Add the new user to the local state
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  const updateData = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      const { data } = await axios.put("http://localhost:3001/update", {
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
  

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${id}`);
      // Update the local state here if necessary
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  useEffect(() => {
    fetchData(); // example of getting all users

    const newUserExample = {
      "name": "Stephen Martin",
      "username": "IPlayFootball",
      "email": "football@ucf.edu",
      "password": "GoKnightsIPlayFootball42",
      "profilePicture": "https://example.com/profile.jpg",
      "friendList": [100, 200, 300]      
    };
    addData(newUserExample); // example of adding a newUser

    // Specify the search criteria
    const query = { username: "IPlayFootball" };
    let documents = searchDataGetDocumnets(query);
    let listIDsPromise = searchDataGetIDs(query);

    const updatedUserExample = {
      "name": "UPDATED",
      "username": "UPDATED",
      "email": "UPDATED@ucf.edu",
      "password": "UPDATED",
      "profilePicture": "https://example.com/profile.jpg",
      "friendList": [1, 2, 3]      
    };
    updateData(listIDsPromise, updatedUserExample) // updating an existing user
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

export default App;