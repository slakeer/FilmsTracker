import { API_URL } from './apiConfig';

export const addToFavorites = async (userId, movieId) => {
  try {
    const response = await fetch(`${API_URL}/favorite-movies`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        movieId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add/remove from favorites');
    }

    return response;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};

export const removeFromFavorites = async (userId, movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/favorite-movies/${userId}/${movieId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to remove from favorites: ${errorDetails.message || response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const getFavoriteFilms = async userId => {
  try {
    const response = await fetch(`${API_URL}/favorite-movies/${userId}`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch favorite movies');
    }

    return data;
  } catch (error) {
    console.error('Error fetching favorite films:', error);
    throw error;
  }
};
