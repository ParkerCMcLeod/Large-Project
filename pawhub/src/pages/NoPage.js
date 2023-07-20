import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import NotFoundPic from "../images/maxresdefault.jpg"; // Import the image you want to use for the background

function NoPage() {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${NotFoundPic})`;
    document.body.style.backgroundSize = "50%";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
      document.body.style.backgroundPosition = null;
      document.body.style.backgroundRepeat = null;
      document.body.style.backgroundAttachment = null;
    };
  }, []); // The empty array [] as the second argument makes the effect run only once (on component mount)

  return (
    <div>
      <Navigation />

      <h2 style={{ paddingTop: "100px", color: "black", fontSize: "40px", textAlign: "center" }}>
        Error 404: Not Found
      </h2>
    </div>
  );
}

export default NoPage;
