import React from "react";
import Navigation from "../components/Navigation";
import "./HomePage.css";
import "./Pages.css";
import Donation from "../components/Donation";
import PostCard from "../components/PostCard";
import NewPost from "../components/NewPost";
import Links from "../components/Links";

function HomePage() {
  return (
    <div className="HomePage">
      <Navigation />
      <Donation />
      <div className="ColumnContainer">
        <NewPost />
        <PostCard />
      </div>
      <Links />
    </div>
  );
}

export default HomePage;
