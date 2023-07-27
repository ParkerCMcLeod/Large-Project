import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

// Search for users and return user data
export const searchUsersReturnUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchUsersReturnUsers`, {
      params: query
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search data', error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

// Search for users and return user IDs
export const searchUsersReturnIDs = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchUsersReturnIDs`, {
      params: query
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search data', error);
    throw error;
  }
};

// Add a new user
export const addNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/addNewUser`, newUser);
    return response.data;
  } catch (error) {
    console.error('Failed to post data', error);
    throw error;
  }
};

// Update all matching users
export const updateAllMatchingUsers = async (listIDsPromise, updatedUser) => {
  try {
    const listIDs = await listIDsPromise;
    const response = await axios.put(`${BASE_URL}/updateMatchingUsers`, {
      listIDs,
      updatedUser,
    });
    if (response.status === 200 && response.data.message === "Data updated successfully") {
      return response.data.users;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update data:", error.message);
    throw error;
  }
};

// Delete all users matching a query
export const deleteMatchingUsers = async (query) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteMatchingUsers`, {
      params: query
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete data', error);
    throw error;
  }
};

// Search for posts and return post data
export const searchPostsReturnPosts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchPostsReturnPosts`, {
      params: query
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search data', error);
    throw error;
  }
};

// Search for posts and return post IDs
export const searchPostsReturnIDs = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchPostsReturnIDs`, {
      params: query
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search data', error);
    throw error;
  }
};

// Add a new post
export const addNewPost = async (newPost) => {
  try {
    const response = await axios.post(`${BASE_URL}/addNewPost`, newPost);
    return response.data;
  } catch (error) {
    console.error('Failed to post data', error);
    throw error;
  }
};

// Update all matching posts
export const updateAllMatchingPosts = async (listIDsPromise, updatedPost) => {
  try {
    const listIDs = await listIDsPromise;
    const response = await axios.put(`${BASE_URL}/updateMatchingPosts`, {
      listIDs,
      updatedPost,
    });
    if (response.status === 200 && response.data.message === "Data updated successfully") {
      return response.data.posts;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update data:", error.message);
    throw error;
  }
};

// Delete all posts matching a query
export const deleteMatchingPosts = async (query) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteMatchingPosts`, {
      data: query
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete data', error);
    throw error;
  }
};