import axios from 'axios';
import dotenv from 'dotenv';
//наш скрипт для заповнення бд даними, перейди в директорію scripts і пропиши node <назва цього файлу>
dotenv.config();
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

console.log(TMDB_BEARER_TOKEN);

async function fetchMovies(page = 1) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page,
        sort_by: 'popularity.desc'
      },
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: 'application/json'
      }
    });

    const movies = response.data.results;

    console.log('Fetched Movies:', JSON.stringify(movies, null, 2));

    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

async function fetchGenres() {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        language: 'en-US'
      },
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: 'application/json'
      }
    });

    const genres = response.data.genres;

    console.log('Fetched Genres:', JSON.stringify(genres, null, 2));

    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

(async function main() {
  await fetchMovies();
  await fetchGenres();
})();
