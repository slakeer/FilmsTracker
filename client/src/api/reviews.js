import { API_URL } from './apiConfig';

export const fetchMovieReviews = async (movieId) => {
  const response = await fetch(`${API_URL}/reviews/movie/${movieId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
};

export const postMovieReview = async (reviewData) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error('Failed to post review');
  }
  return response.json();
};
