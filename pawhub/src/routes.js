const express = require("express");
const router = express.Router();

// Import the functions from db.js
const {
  connectToDatabase,
  searchUsersReturnUsers,
  searchUsersReturnIDs,
  addNewUser,
  updateMatchingUsers,
  deleteMatchingUsers,
  searchPostsReturnPosts,
  searchPostsReturnIDs,
  addNewPost,
  updateMatchingPosts,
  deleteMatchingPosts,
} = require("./db");

// API to search for users by query
router.get("/searchUsersReturnUsers", searchUsersReturnUsers);

// API to search for users IDs by query
router.get("/searchUsersReturnIDs", searchUsersReturnIDs);

// API to create a new user
router.post("/addNewUser", addNewUser);

// API to update users
router.put("/updateMatchingUsers", updateMatchingUsers);

// API to delete users
router.delete("/deleteMatchingUsers", deleteMatchingUsers);

// API to search for posts by query
router.get("/searchPostsReturnPosts", searchPostsReturnPosts);

// API to search for posts IDs by query
router.get("/searchPostsReturnIDs", searchPostsReturnIDs);

// API to create a new post
router.post("/addNewPost", addNewPost);

// API to update posts
router.put("/updateMatchingPosts", updateMatchingPosts);

// API to delete posts
router.delete("/deleteMatchingPosts", deleteMatchingPosts);

module.exports = router;