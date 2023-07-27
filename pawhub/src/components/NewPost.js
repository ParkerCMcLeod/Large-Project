import React, { useState, useRef, useEffect } from 'react';
import './newpost.css';
import axios from 'axios';
// const { MongoClient, ObjectId } = require("mongodb");

function NewPost() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [postMessage, setPostMessage] = useState([]);

  const delay = ms => new Promise(res => setTimeout(res, ms));

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

    let response = await addNewPost(newPost);    

    // getting postID by seearching the objectID
    // const string = 'ObjectId(' + response.result.insertedId + ')';
    newObjec
    const getPostQuery =
    {
      "_id": {
        "$oid": ObjectId(response.result.insertedId)
      },
    }
    console.log("postQuery:", getPostQuery);
    const finalPost = await searchPostsReturnPosts(getPostQuery);

    console.log("final:", finalPost);

    // saving image link with USERID and POSTID

    // console.log(images.length);
    // if (images.length >= 0)
    // {
    //   // const arrayOfStrings = [];
    //   // searchPostsReturnIDs{}
      
    //   for (let i = 0; i < images.length; i++)
    //   {
    //     arrayOfStrings = './images/${uID}${'
    //   }
    //     const picPost =
    //   {
    //     "numLikes": 0,
    //     "text": text,
    //     "photo": null,
    //     userID: uID

    //   }
    // }

    setPostMessage("Posted");
    await delay(2000);
    setPostMessage("Add New Post");

  };

  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const selectedImages = Array.from(fileList).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(selectedImages);
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
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt='Selected'
                className='NewPost-image'
              />
            ))}
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
