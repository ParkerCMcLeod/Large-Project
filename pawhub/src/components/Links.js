import React from 'react';
import "../pages/Pages.css";
import image from "../images/github.png"

function Links() {
  return (

    <div className="TitleHolderLinks">
      <img src= {image} />
      
      <h1><a href="https://github.com/ParkerCMcLeod/Large-Project" >Website GitHub</a>
        <a href="https://github.com/rundex0/Large-Project-App" >App GitHub</a>
      </h1>
    </div>
  )
}

export default Links