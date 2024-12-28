import { API_URL } from './apiConfig';

export const fetchMovies = async (start, limit) => {
    try {
        const response = await fetch(`${API_URL}/movies/${start}/${limit}`, {
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

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${API_URL}/genres`);
        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        return ['All', ...data.map(genre => genre.genre_name)];
    } catch (error) {
        console.error('Error while fetching genres:', error);
        throw error;
    }
};