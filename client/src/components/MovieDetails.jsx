import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/movie';
import MovieReviews from './MovieReviews';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="pulse-loader"></div>
      </div>
    );
  }

  if (!movieDetails) return null;

  const genres = movieDetails.movie_genre
    .map((genre) => genre.genre.genre_name)
    .join(' • ');

  const adjustedRating = (Math.max(0, movieDetails.tmdb_rating - 0.1)).toFixed(1);

  return (
    <div className="movie-page">
      <div className="hero-section" style={{ backgroundImage: `url(${movieDetails.image_path})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="poster-container">
            <img src={movieDetails.image_path} alt={movieDetails.title} className="movie-poster" />
            <div className="rating-box">
              <div className="rating-circle">
                <div className="rating-value">
                  <span className="rating-number">{adjustedRating}</span>
                  <svg className="star-icon" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div className="rating-votes">
                  <span>{movieDetails.tmdb_vote_count.toLocaleString()}</span>
                  <span className="votes-label"> votes</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="movie-info">
            <h1 className="movie-title">{movieDetails.title}</h1>
            <div className="movie-meta">
              <span className="release-date">
                {new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="separator">•</span>
              <span className="genres">{genres}</span>
            </div>
            
            <div className="action-buttons">
              <button className="btn-watch">
                <svg viewBox="0 0 24 24" className="play-icon">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch later
              </button>
              <button className="btn-list">
                <svg viewBox="0 0 24 24" className="plus-icon">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                </svg>
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="overview-container">
          <h2>Overview</h2>
          <p className="overview-text">{movieDetails.description}</p>
        </div>
        <MovieReviews movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetails;
