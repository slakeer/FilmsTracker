import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <a href="/">FilmsTracker</a>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Film"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        <nav>
          <ul className="right-menu">
            <li><Link to="/LoginPage">Sign In</Link></li>
            <li><Link to="/SignUp">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
