import React, { useState } from 'react';
import './searchbar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const term = event.target.value.trim().toLowerCase();
    setSearchTerm(term);

    if (term.length === 0) {
      setSearchResults([]);
      return; // No search term entered, exit
    }

    // Simulated user data (replace with your own data source)
    const users = [
      { name: 'John Doe', following: false },
      { name: 'Jane Smith', following: false },
      { name: 'Alex Johnson', following: false },
      { name: 'Sarah Adams', following: false },
      { name: 'David Lee', following: false },
      { name: 'Emily Taylor', following: false },
      { name: 'Michael Brown', following: false }
      // ...
    ];

    const results = users
      .filter((user) => user.name.toLowerCase().includes(term))
      .slice(0, 5); // Limit results to 5

    setSearchResults(results);
  };

  const handleFollowToggle = (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].following = !updatedResults[index].following;
    setSearchResults(updatedResults);
  };

  return (
    <div className="SearchBar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <div className="search-overlay">
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="search-result">
                  <span>{result.name}</span>
                  <button
                    className={`follow-button ${result.following ? 'following' : ''}`}
                    onClick={() => handleFollowToggle(index)}
                  >
                    {result.following ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
