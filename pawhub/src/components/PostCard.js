import React, { useState } from 'react';
import './postcard.css';
import PostPicture from "../images/LandingPagePic.jpg";
import LikeButton from './LikeButton';
import Example1 from "../images/DarthDogus.PNG"
import Example2 from "../images/Meow.jpg"
import Example3 from "../images/Pug.jpg"

function PostCard() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("With My best Friend Shaggy! 🐶  🐶#bff");
  const [images, setImages] = useState([
    Example1,
    Example2,
    Example3
  ]);

  return (
    <div className='PostCard-container'>
      <div className='PostCard-inner'>
        <div className='Picture'>
          <img src={PostPicture} alt='profile pic' />
        </div>
        
        <div className='postcard-fields'>
          <p>LiL_PuG · 10/10/2023 *EXAMPLE*</p>
        </div>

        <div className='text-container'>
          {editing ? (
            <>
              <textarea
                className={'PostCard-text edit-textarea'}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className='PostCard-text'>{text}</p>
            </>
          )}
          
          <div className="Like-btn">
            <LikeButton />
          </div>
          
          
        </div>
        <div className="image-container" style={{borderRadius: " 0 0 10px 10px"}}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`image-${index + 1}`} style={{borderRadius: "10px", marginLeft: "10px"}}  />
            ))}
          </div>
      </div>
    </div>
  );
}

export default PostCard;
