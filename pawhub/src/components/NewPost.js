import React, { useState, useRef, useEffect } from 'react';
import './newpost.css';
import axios from 'axios';

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

  const readFile = async(file) => {

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const fileData = reader.result; // The data read from the file
        resolve(fileData);
      };
  
      reader.onerror = reject; //  In case of an error, reject the promise
  
      reader.readAsDataURL(file); // Start reading the file and convert it to a data URL
    });
    
  }

  const handleAddPost = async() => {
    // Perform any necessary actions with the entered text and images
    
    console.log(images[0]);
    const query = {"email": localStorage.getItem('email')}
    const currentUser = await searchUsersReturnUsers(query);
    const uID = currentUser[0].userID;
    let newPost;
    

    console.log("length " + images.length);
    if(images.length === 0)
    {
      newPost =
      {
        "numLikes": 0,
        "text": text,
        "photo": "",
        userID: uID
      }
    }
    else{
      newPost =
      {
        "numLikes": 0,
        "text": text,
        "photo": images,
        userID: uID
      }
    }
    let response = await addNewPost(newPost);
    console.log(newPost);

    // adding a post
    setPostMessage("Posted");
    await delay(2000);
    setPostMessage("Add New Post");
    setImages("");
    setText("");
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    const newfile = await readFile(file);
    console.log(newfile);
    setImages(newfile);

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
