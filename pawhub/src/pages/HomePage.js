import React from "react";
import Navigation from "../components/Navigation";
import "./HomePage.css";
import "./Pages.css";
import Donation from "../components/Donation";
import PostList from "../components/PostList";
import Links from "../components/Links";
import NewPost from "../components/NewPost";

function HomePage() {
  return (
    <div className="HomePage">
      <Navigation />
      <Donation />
      <div className="ColumnContainer">
      <NewPost />
        <PostList />
      </div>
      <Links />
    </div>
  );
}

export default HomePage;
