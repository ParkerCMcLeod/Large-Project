import React, { useState } from 'react';
import './postcard.css';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <div>
      <button className={liked ? 'like-button liked' : 'like-button'} onClick={handleLikeClick}>
        <i className={liked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}></i>
        {liked ? 'Liked' : 'Like'}
      </button>
      <span className="likes-count">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
    </div>
  );
}

export default LikeButton;
