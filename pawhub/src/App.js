import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import * as Api from "./ApiMiddleware"; // Import the API functions from a separate module

function App() {
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

      let response = await Api.addNewUser(newUserExample);

      const query = { username: "IPlayFootball" };
      const userSearchResultsUsers = await Api.searchUsersReturnUsers(query);
      const userSearchResultsIDs = await Api.searchUsersReturnIDs(query);

      const updatedUserExample = {
        name: "Stephen MartinUPDATED",
        username: "IPlayFootballUPDATED",
        email: "football@ucf.eduUPDATED",
        password: "GoKnightsIPlayFootball42UPDATED",
        profilePicture: "https://example.com/profile.jpgUPDATED",
        friendList: [100000, 200000, 300000]
      };

      response = await Api.updateAllMatchingUsers(userSearchResultsIDs, updatedUserExample);

      // delete all users matching a query
      const deleteUserQuery = { username: "IPlayFootballUPDATED" };
      response = await Api.deleteMatchingUsers(deleteUserQuery);
    };

    const examplePostsAPIFunctionality = async () => {
      const newPostExample = {
        numLikes: 8,
        text: "Hello World!",
        photo: "https://example.com/profile.jpg",
        userID: 42
      };
      let response = await Api.addNewPost(newPostExample);

      const query = { text: "Hello World!" };
      const postSearchResultsPosts = await Api.searchPostsReturnPosts(query);
      const postSearchResultsIDs = await Api.searchPostsReturnIDs(query);

      const updatedPostExample = {
        numLikes: 10000,
        text: "Hello World!UPDATED",
        photo: "https://example.com/profile.jpgUPDATED",
        userID: 42000
      };

      response = await Api.updateAllMatchingPosts(postSearchResultsIDs, updatedPostExample);

      // delete all posts matching a query
      const deletePostQuery = { numLikes: 10000 };
      response = await Api.deleteMatchingPosts(deletePostQuery);
    };

    exampleUsersAPIFunctionality();
    examplePostsAPIFunctionality();
  }, []);

  return (
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
  );
}

export default App;