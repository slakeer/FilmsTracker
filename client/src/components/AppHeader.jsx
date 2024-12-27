import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/AppHeader.css';

const AppHeader = ({ onSearch, onGenreSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    onGenreSelect(genre === 'All' ? null : genre);
  };

  const handleLogout = () => {
    logout();
    navigate('/LoginPage');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          FilmsTracker
        </Link>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Film"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        <nav className="navigation">
          {isLoggedIn ? (
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="avatar-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="avatar-container">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqdbyPHzVsKST5c13LZteoLb-mIrVyD7FK7Q&s"
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <div className="avatar-overlay"></div>
                </div>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqdbyPHzVsKST5c13LZteoLb-mIrVyD7FK7Q&s"
                      alt="User Avatar"
                      className="dropdown-avatar"
                    />
                    <div className="user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-status">Premium Member</p>
                    </div>
                  </div>

                  <div className="dropdown-content">
                    <button className="dropdown-item">My Watchlist</button>
                    <button className="dropdown-item">Favorite films</button>
                  </div>

                  <div className="dropdown-footer">
                    <button onClick={handleLogout} className="logout-button">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/LoginPage" className="sign-in">
                Sign In
              </Link>
              <Link to="/SignUp" className="sign-up">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>

      <div className="genre-filter">
        <div className="genre-list">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-button ${selectedGenre === genre ? 'genre-button-active' : ''}`}
              onClick={() => handleGenreChange(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
