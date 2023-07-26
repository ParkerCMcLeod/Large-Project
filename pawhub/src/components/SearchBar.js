import React, { useState } from 'react';
import './searchbar.css';
import axios from 'axios';
const SearchBar = () => {

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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (event) => {
    const term = event.target.value.trim();
    setSearchTerm(term);

    if (term.length === 0) {
      setSearchResults([]);
      return; // No search term entered, exit
    }

    try {
      const query = { name: { $regex: "(?i)" + term }};
      const users = await searchUsersReturnUsers(query);
      setSearchResults(users.slice(0, 5)); // Limit results to 5
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  const handleFollowToggle = (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].following = !updatedResults[index].following;
    setSearchResults(updatedResults);
  };

  return (
    <div className="SearchBar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <div className="search-overlay">
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="search-result">
                  <span>{result.name}</span>
                  <button
                    className={`follow-button ${result.following ? 'following' : ''}`}
                    onClick={() => handleFollowToggle(index)}
                  >
                    {result.following ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;