import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWatchedMovies, fetchMovieDetails } from '../api/watchedFilms';
import styles from '../styles/WatchedFilms.module.css';

const WatchedFilms = () => {
  const { userId } = useParams();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWatchedMovies();
  }, [userId]);

  const loadWatchedMovies = async () => {
    setLoading(true);
    try {
      const watchedData = await fetchWatchedMovies(userId);
      const moviesWithDetails = await Promise.all(
        watchedData.map(async (watched) => {
          const movieData = await fetchMovieDetails(watched.movie_id);
          return {
            ...watched,
            movieDetails: movieData
          };
        })
      );
      setWatchedMovies(moviesWithDetails);
    } catch (err) {
      setError('Failed to load watched movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>My Watched Movies</h1>
        <div className={styles.gridWrapper}>
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className={styles.movieCard}>
              <div className={styles.skeletonPoster}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Watched Movies</h1>
      <div className={styles.gridWrapper}>
        {watchedMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <div className={styles.posterWrapper}>
              <img
                src={movie.movieDetails?.image_path}
                alt={movie.movieDetails?.title}
                className={styles.poster}
                loading="lazy"
              />
              <div className={styles.ratingBadge}>
                <span className={styles.star}>★</span>
                {movie.movieDetails?.tmdb_rating?.toFixed(1)}
              </div>
              <div className={styles.overlay}>
                <p className={styles.overview}>
                  {movie.movieDetails?.description}
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.movieTitle}>
                {movie.movieDetails?.title}
              </h3>
              <div className={styles.metadata}>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>📅</span>
                  {formatDate(movie.movieDetails?.release_date)}
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>👥</span>
                  {movie.movieDetails?.tmdb_vote_count.toLocaleString()} votes
                </div>
              </div>
              <div className={styles.genres}>
                {movie.movieDetails?.movie_genre.map((genre, index) => (
                  <span key={index} className={styles.genreTag}>
                    {genre.genre.genre_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {watchedMovies.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🎬</span>
          <p>No watched movies yet</p>
          <p className={styles.emptySubtext}>
            Movies you watch will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchedFilms;