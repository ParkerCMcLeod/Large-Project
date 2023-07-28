import React from "react";
import Navigation from "../components/Navigation";
import "./HomePage.css";
import "./Pages.css";
import Donation from "../components/Donation";
import PostCard from "../components/PostCard";
import PostList from "../components/PostList";
import Links from "../components/Links";

function HomePage() {
  return (
    <div className="HomePage">
      <Navigation />
      <Donation />
      <div className="ColumnContainer">
        <PostList />
      </div>
      <Links />
    </div>
  );
}

export default HomePage;
