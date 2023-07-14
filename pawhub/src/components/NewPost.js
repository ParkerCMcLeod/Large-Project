import React, { useState, useRef } from 'react';
import './newpost.css';

function NewPost() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddPost = () => {
    // Perform any necessary actions with the entered text and images
    console.log("New post added:", text);
    console.log("Images:", images);
    setText("");
    setImages([]);
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
          accept='image/*'
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
            Add Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
