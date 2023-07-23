import React from 'react';
import "../pages/Pages.css";

function Links() {
  return (

    <div className="TitleHolderLinks">
      <h1><a href="https://github.com/ParkerCMcLeod/Large-Project" >Website GitHub</a>
        <a href="https://github.com/rundex0/Large-Project-App" >App GitHub</a>
      </h1>
      <img src={process.env.PUBLIC_URL + "/images/"} alt="GitHub Pic" />
    </div>
  )
}

export default Links