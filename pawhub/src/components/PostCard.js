import React, { useEffect, useState } from 'react';
import './postcard.css';
import LikeButton from './LikeButton';

function PostCard({postData}) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState([]);
  const [username, setUserName] = useState([]);
  const [pfp, setpfp] = useState([]);
  const [text, setText] = useState("With My best Friend Shaggy! 🐶  🐶#bff");
  const [images, setImages] = useState([]);

  useEffect(() => {

      setText(postData.text);
      setImages(postData.images);
      setUserName(postData.username);
      setDate(postData.date);
      setpfp(postData.pfp);
  }, []);


  return (
    <div className='PostCard-container'>
      <div className='PostCard-inner'>
        <div className='Picture'>
          <img src={pfp} alt='profile pic' />
        </div>
        
        <div className='postcard-fields'>
          <p>{username}</p>
          <p>{date}</p>
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
            <LikeButton l={postData.numLikes} postID = {postData.postID}/>
          </div>
          
          
        </div>
        {images.length > 0 && (
          <div className='NewPost-image-container'>
              <img
                src={images}
                alt='Selected'
                className='NewPost-image'
              />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
