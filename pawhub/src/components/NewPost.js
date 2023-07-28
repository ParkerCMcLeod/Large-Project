import React, { useState, useRef, useEffect } from 'react';
import './newpost.css';
import axios from 'axios';
const fs = require('fs');

function NewPost() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [postMessage, setPostMessage] = useState([]);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  function imageToBase64String(imageFile) {
    try {
      // Read the image file as a buffer
      const imageBuffer = fs.readFileSync(imageFile.path);
  
      // Encode the image buffer to Base64
      const base64String = imageBuffer.toString('base64');
  
      return base64String;
    } catch (err) {
      console.error('Error converting image to Base64:', err.message);
      return null;
    }
  }
  
  // Function to convert a Base64 string back to binary image data and save it to a file
  function base64StringToImage(base64String, outputFile) {
    try {
      // Create a Buffer from the Base64 string
      const imageBuffer = Buffer.from(base64String, 'base64');
  
      // Write the buffer to a new image file
      fs.writeFileSync(outputFile.path, imageBuffer);
  
      console.log('Image successfully converted back from Base64 and saved!');
    } catch (err) {
      console.error('Error converting Base64 string to image:', err.message);
    }
  }

  useEffect(() => {

    setPostMessage("Add Post");
  }, []);  

  const fileInputRef = useRef(null);

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
  
  const addNewPost = async (newPost) => {
    try {
      let response = await axios.post('http://localhost:3001/api/addNewPost', newPost);
      return response.data;
    } catch (error) {
      console.error('Failed to post data', error);
    }
  };

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

  const handleAddPost = async() => {
    // Perform any necessary actions with the entered text and images
    console.log("New post added:", text);
    console.log("Images:", images);

    const imageString = imageToBase64String(images);
    console.log(imageString);
    const query = {"email": localStorage.getItem('email')}
    const currentUser = await searchUsersReturnUsers(query);
    const uID = currentUser[0].userID;

    // adding a post
    const newPost =
    {
      "numLikes": 0,
      "text": text,
      "photo": null,
      userID: uID
    }

    // let response = await addNewPost(newPost);    
    // // console.log("response", response);
    // let getPostQuery = { postID: response.newPostID };
    // // console.log(getPostQuery);
    // let finalPost = await searchPostsReturnPosts(getPostQuery);
    // console.log("finalpost",finalPost);

    setPostMessage("Posted");
    await delay(2000);
    setPostMessage("Add New Post");

  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    console.log(fileList)
  
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='NewPost-container'>
      <div className='NewPost-inner'>
        <textarea
          className='NewPost-text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter your post...'
        />

        <input
          ref={fileInputRef}
          type='file'
          accept="image/*"
          onChange={handleImageChange}
          className='NewPost-file-input'
          multiple
        />

        {images.length > 0 && (
          <div className='NewPost-image-container'>
              <img
                src={images}
                alt='Selected'
                className='NewPost-image'
              />
          </div>
        )}

        <div className='buttons'>
          <button className='ChooseFile-button' onClick={handleButtonClick}>
            Choose File
          </button>

          <button className='NewPost-button' onClick={handleAddPost}>
            {postMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
