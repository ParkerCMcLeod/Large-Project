import React, { useState } from 'react';
import './searchbar.css';
import axios from 'axios';
const SearchBar = () => {

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

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchUsersReturnIDs = async (query) => {
    try {
      let response = await axios.get('https://pawhub.space/api/searchUsersReturnIDs', {
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
      let response = await axios.post('https://pawhub.space/api/addNewUser', newUser);
      return response.data;
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
    try {
      const listIDs = await listIDsPromise;
      let response = await axios.put("https://pawhub.space/api/updateMatchingUsers", {
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
      let response = await axios.delete('https://pawhub.space/api/deleteMatchingUsers', { params: query });
  
      // Assuming setApiData is a function in a React component to update state
      return response.data;
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchPostsReturnPosts = async (query) => {
    try {
      let response = await axios.get('https://pawhub.space/api/searchPostsReturnPosts', {
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
      let response = await axios.get('https://pawhub.space/api/searchPostsReturnIDs', {
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
      let response = await axios.post('https://pawhub.space/api/addNewPost', newPost);
      return response.data;
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const updateAllMatchingPosts = async (listIDsPromise, updatedPost) => {
    try {
      const listIDs = await listIDsPromise;
      const response = await axios.put("https://pawhub.space/api/updateMatchingPosts", {
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
      let response = await axios.delete('https://pawhub.space/api/deleteMatchingPosts', { data: query });
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
    console.log(term);

    if (term.length === 0) {
      setSearchResults([]);
      return; // No search term entered, exit
    }

    try {
      let query = { name: { $regex: "(?i)" + term }};
      const users = await searchUsersReturnUsers(query);
      console.log("users", users);
      setSearchResults(users); // Limit results to 5
      
      setSearchResults(users.slice(0, 5)); // Limit results to 5
      console.log("searchResults", searchResults);

      let selfEmail = localStorage.getItem('email');
      query = { email: selfEmail };
      const selfUser = await searchUsersReturnUsers(query);
      
      let updatedResults = users.slice(0, 5);


      for (let i = 0; i < updatedResults.length; i++) {
        if(selfUser[0].friendList.includes(updatedResults[i].userID)) {
            updatedResults[i].following = true;
        } else {
          updatedResults[i].following = false;
        }
      }
      
      setSearchResults(updatedResults);
      console.log("updatedresutls", updatedResults);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  const handleFollowToggle = async (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].following = !updatedResults[index].following;
    let followedUserID = updatedResults[index].userID;
    let selfEmail = localStorage.getItem('email');
    const query = { email: selfEmail };
    const selfUser = await searchUsersReturnUsers(query);

    if (updatedResults[index].following === true) {
      let already_following = false;
      for (let i = 0; i < updatedResults.length; i++) {
        if(selfUser[0].friendList.includes(updatedResults[i].userID)) {
          already_following = true;
        }
      }
      if (already_following === false) {
        selfUser[0].friendList.push(followedUserID);
      }
    } else {
      selfUser[0].friendList = selfUser[0].friendList.filter(item => item !== followedUserID);
    }

    let selUserObjIDArray = [selfUser[0]._id];
    delete selfUser[0]._id;
    delete selfUser[0].userID;
    delete selfUser[0].dateCreated;
    
    let status = await updateAllMatchingUsers(selUserObjIDArray, selfUser[0]);
    console.log(searchResults);
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
         {searchTerm && searchResults.length > 0 && (
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