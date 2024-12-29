import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addToFavorites, removeFromFavorites } from '../api/favoriteFIlms';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, movieIdFromGenre }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);
  const genres = movie.movie_genre
    .map((mg) => mg.genre.genre_name)
    .join(' • ');

  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const rating = Number(movie.tmdb_rating).toFixed(1);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(user.id, movieIdFromGenre);
        setIsFavorite(false);
      } else {
        await addToFavorites(user.id, movieIdFromGenre);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={movie.image_path} alt={movie.title} className="movie-poster" />
        <div className="movie-overlay">
          <div className="overlay-content">
            <div className="movie-quick-info">
              <div className="rating-badge">
                <svg className="starIcon" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="rating-value">{rating}</span>
              </div>
              <span className="release-year">{new Date(movie.release_date).getFullYear()}</span>
            </div>

            <h3 className="overlay-title">{movie.title}</h3>
            <p className="overlay-genres">{genres}</p>
            <p className="overlay-date">{releaseDate}</p>

            <div className="overlay-description">
              <p>{movie.description && movie.description.slice(0, 150)}...</p>
            </div>

            <div className="movie-buttons">
              <Link to={`/movie/${movieIdFromGenre}`} className="btn-details">
                <span>View Details</span>
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button className="btn-watchlist" onClick={handleFavoriteClick}>
                <svg className="plus-icon" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="info-bottom">
          <div className="rating-pill">
            <svg className="starIcon" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span>{rating}</span>
          </div>
          <span className="movie-year">{new Date(movie.release_date).getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    movie_genre: PropTypes.arrayOf(
      PropTypes.shape({
        genre: PropTypes.shape({
          genre_name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    release_date: PropTypes.string.isRequired,
    tmdb_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  movieIdFromGenre: PropTypes.string.isRequired,
};

export default MovieCard;
