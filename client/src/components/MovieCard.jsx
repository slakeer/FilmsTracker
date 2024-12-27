import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, movieIdFromGenre }) => {
  const genres = movie.movie_genre
    .map(mg => mg.genre.genre_name)
    .join(' • ');

  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const rating = Number(movie.tmdb_rating).toFixed(1);

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={movie.image_path} alt={movie.title} className="movie-poster" />

        <div className="movie-overlay">
          <div className="overlay-content">
            <div className="movie-quick-info">
              <div className="rating-badge">
                <svg className="star-icon" viewBox="0 0 24 24">
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
              <button className="btn-watchlist">
                <svg className="plus-icon" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Watchlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="info-bottom">
          <div className="rating-pill">
            <svg className="star-icon" viewBox="0 0 24 24">
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

export default MovieCard;