import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export async function fetchMovies(prisma, page = 1) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
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
    console.log(
      `Fetched Movies (Page ${page}):`,
      JSON.stringify(movies, null, 2)
    );

    for (let movie of movies) {
      const existingMovie = await prisma.movie.findUnique({
        where: { external_id: movie.id }
      });

      if (!existingMovie) {
        const createdMovie = await prisma.movie.create({
          data: {
            external_id: movie.id,
            title: movie.title,
            release_date: new Date(movie.release_date),
            image_path: `${TMDB_BASE_IMAGE_URL}${movie.poster_path}` || '',
            description: movie.overview || '',
            tmdb_rating: movie.vote_average || 0,
            tmdb_vote_count: movie.vote_count || 0,
            adult: movie.adult || false
          }
        });

        // заповнення MovieGenres(крч вяжем фільми з жанрами в окрему таблицю)
        for (let genreId of movie.genre_ids) {
          const genre = await prisma.genre.findUnique({
            where: { external_id: genreId }
          });

          if (genre) {
            await prisma.movieGenre.create({
              data: {
                movie_id: createdMovie.id,
                genre_id: genre.id
              }
            });
          }
        }

        console.log(`Added movie: ${movie.title}`);
      } else {
        console.log(`Movie already exists in DB: ${movie.title}`);
      }
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}
