import React, { useState } from 'react';
import './postcard.css';
import PostPicture from "../images/LandingPagePic.jpg";
import LikeButton from './LikeButton';

function PostCard() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("With My best Friend Shaggy! 🐶  🐶#bff");

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Perform any necessary save/update operation with the edited text
    // For now, we'll just update the state with the new text
    setText(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className='PostCard-container'>
      <div className='PostCard-inner'>
        <img src={PostPicture} alt='profile pic' />
        
        <div className='postcard-fields'>
          <p>LiL_PuG · 10/10/2023 *EXAMPLE*</p>
        </div>

        <div className='text-container'>
          {editing ? (
            <>
              <textarea
                className='PostCard-text'
                value={text}
                onChange={handleChange}
              />
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <p className='PostCard-text'>{text}</p>
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
          
          <div className="Like-btn">
            <LikeButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
