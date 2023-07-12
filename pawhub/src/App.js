import React, { useEffect, useState } from "react";
import axios from 'axios';
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GroupChat from "./pages/GroupChat";

function App() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api');
        console.error(response);
        setApiData(response.data);
      } catch (error) {
        console.error("RESPONSE2");
        console.error('Failed to fetch data', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that the effect runs only once
  
  return (
    <div>
      {/* Example render of api data */}
      {/* <div>
        {data.map((item) => (
          <div key={item._id}>{item.name}</div>
        ))}
      </div> */}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<GroupChat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
