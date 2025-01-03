import { API_URL } from './apiConfig';

export const addMovieToWatched = async (userId, movieId) => {
  const response = await fetch(`${API_URL}/watched-movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify({ userId, movieId })
  });

  if (!response.ok) {
    throw new Error('Failed to add movie to watched list');
  }
  return await response.json();
};

export const fetchWatchedMovies = async userId => {
  const response = await fetch(`${API_URL}/watched-movies/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch watched movies');
  }
  return await response.json();
};

export const fetchMovieDetails = async movieId => {
  const response = await fetch(`${API_URL}/movies/${movieId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return await response.json();
};
