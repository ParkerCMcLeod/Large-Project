import React from "react";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GroupChat from "./pages/GroupChat";

function App() {
  return (
  <div>
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="*" element={<NoPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/chat" element={<GroupChat />} />
    </Routes>
  </BrowserRouter>


  </div> )
  
}

export default App;

