import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

export async function fetchGenres(prisma) {
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
    console.log('Genres:', genres);

    for (let genre of genres) {
      await prisma.genre.upsert({
        where: { external_id: genre.id || -1 },
        update: {},
        create: {
          external_id: genre.id,
          genre_name: genre.name
        }
      });
    }
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}
