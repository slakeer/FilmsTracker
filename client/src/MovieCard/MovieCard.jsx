import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-rating-overlay">
          <i className="fas fa-star"></i> {movie.rating}
        </div>
      </div>
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-release-date">{movie.releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;