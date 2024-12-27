import { API_URL } from './apiConfig';

export const fetchMovies = async () => {
    try {
        const response = await fetch(`${API_URL}/movies`, {
            headers: { Accept: '*/*' },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${API_URL}/movies/${movieId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};