import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchGenres } from '../api/movie';
import '../styles/AppHeader.css';

const AppHeader = ({ onSearch, onGenreSelect }) => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    getGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInputChange = e => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleGenreChange = genre => {
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
                    <button className="dropdown-item">
                      <Link to={`/favorite-films/${user.id}`}>
                        Favorite films
                      </Link>
                    </button>
                    <button className="dropdown-item">
                      <Link to={`/watched-films/${user.id}`}>
                        Watched films
                      </Link>
                    </button>
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
          {genres.map(genre => (
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

AppHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onGenreSelect: PropTypes.func.isRequired
};

export default AppHeader;
