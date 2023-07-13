import React from "react";
import Navigation from "../components/Navigation";
import "./HomePage.css";
import "./Pages.css";
import Donation from "../components/Donation";
import PostCard from "../components/PostCard";



function HomePage() {
  return (
    <div className="pawprint-pattern">
      <div className="HomePage">
        <Navigation />
        <Donation />
        <PostCard />


      </div>
    </div>
  )

}

export default HomePage;

