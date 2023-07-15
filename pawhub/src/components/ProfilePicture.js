import React, { useRef, useState } from 'react';
import ProfilePic from "../images/defaultPic.jpg";
import "./profile.css";

function ProfilePicture(props) {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  }

  return (
    <div className="profile-image-container" onClick={handleImageClick}>
      {image ? (
        <img
          src={URL.createObjectURL(image)}
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
