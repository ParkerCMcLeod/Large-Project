import React, { useRef, useState } from 'react';
import ProfilePic from "../images/defaultPic.jpg";
import "./profile.css";

function ProfilePicture({image, setImage}) {
  const inputRef = useRef(null);
  
  const handleImageClick = () => {
    inputRef.current.click();
  }

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

  const fixDefault = async(event) =>
  {
    
  }


  const handleImageChange = async(event) => {
    const file = event.target.files[0];
    const newfile = await readFile(file);

    setImage(newfile);
  }

  
  return (
    <div className="profile-image-container" onClick={handleImageClick}>
      {image ? (
        <img
          src={image}
          alt='profile pic'
          className="profile-image"
        />
      ) : (
        <img
          src={ProfilePic}
          alt='profile pic'
          className="profile-image"
        />
      )}
      <div className="profile-overlay">
        <span className="edit-text">Edit</span>
      </div>

      <input
        type='file'
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ProfilePicture;
