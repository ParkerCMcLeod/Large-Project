import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";

function App() {
  // this line declare apiData as a empty array and is set by setApiData
  // it also makes anything using apiData rerender when the value is changes
  const [apiData, setApiData] = useState([]);

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const searchUsersReturnUsers = async (query) => {
    try {
      let response = await axios.get('http://localhost:3001/searchUsersReturnUsers', {
        params: query
      });
      setApiData(response.data); // uses the data and rerenders relevant changes
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
      const { data } = await axios.put("http://localhost:3001/updateMatchingUsers", {
        listIDs,
        updatedUser,
      });
      if (data.status === 200 && data.message === "Data updated successfully") {
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
      await axios.delete(`http://localhost:3001/deleteMatchingUsers`);
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
      const { data } = await axios.put("http://localhost:3001/updateMatchingPosts", {
        listIDs,
        updatedPost,
      });
      if (data.status === 200 && data.message === "Data updated successfully") {
        setApiData((apiData) =>
          apiData.map((post) => (listIDs.includes(post._id) ? updatedPost : post))
        );
      }
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error("Failed to update data:", error.message);
    }
  };

  // API IMPLEMENTATION, NOT FOR NATE OR JESUS
  const deleteMatchingPosts = async (query) => {
    try {
      await axios.delete(`http://localhost:3001/deleteMatchingPosts`);
      setApiData(response.data); // uses the data and rerenders relevant changes
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  useEffect(() => {
    // declare function exampleUsersAPIFunctionality
    const exampleUsersAPIFunctionality = async () => {
      // create a new user json item
      const newUserExample = {
        name: "Stephen Martin",
        username: "IPlayFootball",
        email: "football@ucf.edu",
        password: "GoKnightsIPlayFootball42",
        profilePicture: "https://example.com/profile.jpg",
        friendList: [1, 2, 3]
      };
      // add the new user to database
      await addNewUser(newUserExample);

      // search for users matching query and return them
      let query = { username: "IPlayFootball" };
      let userSearchResults = await searchUsersReturnUsers(query);

      // search for users matching query and return their IDs
      let userSearchResultsIDs = searchUsersReturnIDs(query);

      // set all users maching IDs from search results above to be this new user
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
      query = { postname: "IPlayFootballUPDATED" };
      await deleteMatchingUsers(query);
    };

    // declare function examplePostsAPIFunctionality
    const examplePostsAPIFunctionality = async () => {
      // create a new post json item
      const newPostExample = {
        numLikes: 8,
        text: "Hello World!",
        photo: "https://example.com/profile.jpg",
        userID: 42
      };
      // add the new post to database
      await addNewPost(newPostExample);

      // search for posts matching query and return them
      let query = { numLikes: 8 };
      let postSearchResults = await searchPostsReturnPosts(query);

      // search for posts matching query and return their IDs
      let postSearchResultsIDs = searchPostsReturnIDs(query);

      // set all posts maching IDs from search results above to be this new post
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

  // Create a new state variable to represent user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login or signup
  const handleAuthentication = () => {
    setIsLoggedIn(true);
  };


  // THIS WILL ONLY ALLOW LOGGED IN USERS TO ACCESS THE WEBSITE, USE OTHER RETURN TO EDIT

  //  return (
  //   <div>
  //     <div>
  //       <BrowserRouter>
  //         <Routes>
  //           {/* Render the Landing page */}
  //           <Route
  //             path="/"
  //             element={
  //               <LandingPage
  //                 isLoggedIn={isLoggedIn}
  //                 handleAuthentication={handleAuthentication}
  //               />
  //             }
  //           />

  //           {/* Render the Home page if isLoggedIn is true, otherwise redirect to Landing page */}
  //           <Route
  //             path="/home"
  //             element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
  //           />

  //           {/* Always redirect to Landing page for other paths */}
  //           <Route path="/landingPage" element={<Navigate to="/" />} />
  //           <Route path="*" element={<Navigate to="/" />} />
  //         </Routes>
  //       </BrowserRouter>
  //     </div>
  //   </div>
  // );




  // FOR EDITING
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  isLoggedIn={isLoggedIn}
                  handleAuthentication={handleAuthentication}
                />
              }
            />
            <Route
              path="/home" element={<HomePage />}
            />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );


}

export default App