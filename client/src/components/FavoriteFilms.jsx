import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFavoriteFilms, removeFromFavorites } from '../api/favoriteFIlms';
import '../styles/FavoriteFilms.css';

const FavoriteFilms = () => {
  const { userId } = useParams();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(null);

  useEffect(() => {
    fetchFavoriteMovies();
  }, [userId]);

  const fetchFavoriteMovies = async () => {
    try {
      const data = await getFavoriteFilms(userId);
      setFavoriteMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async movieId => {
    try {
      setDeleteInProgress(movieId);
      setFavoriteMovies(prevMovies =>
        prevMovies.filter(movie => movie.movie_id !== movieId)
      );

      await removeFromFavorites(userId, movieId);
    } catch (error) {
      setError(`Failed to remove movie: ${error.message}`);
      await fetchFavoriteMovies();
    } finally {
      setDeleteInProgress(null);
    }
  };

  if (loading) {
    return (
      <div className="films-container">
        <h2 className="films-title">My Favorite Films</h2>
        <div className="films-row">
          {[1, 2, 3].map(i => (
            <div key={i} className="film-card loading">
              <div className="film-poster-skeleton"></div>
              <div className="film-info">
                <div className="title-skeleton"></div>
                <div className="text-skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="films-container">
        <div className="error-message">Error loading films: {error}</div>
      </div>
    );
  }

  return (
    <div className="films-container">
      <h2 className="films-title">My Favorite Films</h2>
      {favoriteMovies.length > 0 ? (
        <div className="films-wrapper">
          <div className="films-row">
            {favoriteMovies.map(favorite => (
              <div key={favorite.movie_id} className="film-card">
                <div className="film-poster">
                  <img
                    src={favorite.movie.image_path}
                    alt={favorite.movie.title}
                    className="film-image"
                  />
                  <div className="film-rating">
                    <span className="star">★</span>
                    {favorite.movie.tmdb_rating.toFixed(1)}
                  </div>
                  <button
                    className={`delete-button ${deleteInProgress === favorite.movie_id ? 'deleting' : ''}`}
                    onClick={() => handleDelete(favorite.movie_id)}
                    disabled={deleteInProgress === favorite.movie_id}>
                    {deleteInProgress === favorite.movie_id
                      ? 'Removing...'
                      : '×'}
                  </button>
                </div>
                <div className="film-info">
                  <h3 className="film-title">{favorite.movie.title}</h3>
                  <p className="film-description">
                    {favorite.movie.description}
                  </p>
                  <div className="film-details">
                    <div className="release-date">
                      <span className="icon">📅</span>
                      {new Date(favorite.movie.release_date).getFullYear()}
                    </div>
                    <div className="film-id">ID: {favorite.movie_id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">No favorite films yet.</div>
      )}
    </div>
  );
};

export default FavoriteFilms;
