import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GroupChat from "./pages/GroupChat";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(users => {
        setData(users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
    </div>
  );
}

export default App;