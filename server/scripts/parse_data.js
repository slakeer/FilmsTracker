import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { config } from '../config.js';

const prisma = new PrismaClient();

const OMDB_API_KEY = config.OMDb.ApiKey;
const OMDB_API_URL = config.OMDb.ApiUrl;

async function fetchMovieFromOMDB(title) {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: OMDB_API_KEY,
        t: title,
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    } else {
      console.error(`Error fetching movie: ${response.data.Error}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data from OMDB: ${error.message}`);
    return null;
  }
}

async function saveMovieToDatabase(movieData) {
  try {
    let genre = await prisma.genre.findFirst({
      where: { genre_name: movieData.Genre.split(', ')[0] },
    });

    if (!genre) {
      genre = await prisma.genre.create({
        data: { genre_name: movieData.Genre.split(', ')[0] },
      });
    }

    const [directorName, directorSurname] = movieData.Director.split(' ');
    let director = await prisma.director.findFirst({
      where: {
        director_name: directorName,
        director_surname: directorSurname || '',
      },
    });

    if (!director) {
      director = await prisma.director.create({
        data: {
          director_name: directorName,
          director_surname: directorSurname || '',
        },
      });
    }

    const existingMovie = await prisma.movie.findFirst({
      where: { title: movieData.Title },
    });

    if (existingMovie) {
      console.log(`Movie "${movieData.Title}" already exists in the database.`);
      return;
    }

    const movie = await prisma.movie.create({
      data: {
        title: movieData.Title,
        genre_id: genre.id,
        release_year: parseInt(movieData.Year, 10),
        description: movieData.Plot,
        rating: parseFloat(movieData.imdbRating) || 0.0,
        director_id: director.id,
      },
    });

    console.log(`Movie saved: ${movie.title}`);

    await saveActorsToDatabase(movieData, movie.id);  
  } catch (error) {
    console.error(`Error saving movie: ${error.message}`);
  }

  
}

async function saveActorsToDatabase(movieData, movieId) {
    const actorNames = movieData.Actors.split(', ');
  
    for (const actorFullName of actorNames) {
      const [actorName, actorSurname] = actorFullName.split(' ');
  
      let actor = await prisma.actor.findFirst({
        where: {
          actor_name: actorName,
          actor_surname: actorSurname || '',
        },
      });
  
      if (!actor) {
        actor = await prisma.actor.create({
          data: {
            actor_name: actorName,
            actor_surname: actorSurname || '',
          },
        });
      }
  
      const existingActorMovie = await prisma.actorMovie.findFirst({
        where: {
          actor_id: actor.id,
          movie_id: movieId,
        },
      });
  
      if (!existingActorMovie) {
        await prisma.actorMovie.create({
          data: {
            actor_id: actor.id,
            movie_id: movieId,
          },
        });
      }
    }
  }  

async function main() {
    const movieTitles = [
        'The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'The Godfather Part II', 
        '12 Angry Men', 'Schindler\'s List', 'The Lord of the Rings: The Return of the King', 
        'Pulp Fiction', 'The Good, the Bad and the Ugly', 'Forrest Gump', 'Fight Club', 'Inception', 
        'The Lord of the Rings: The Fellowship of the Ring', 'Star Wars: Episode V - The Empire Strikes Back', 
        'The Lord of the Rings: The Two Towers', 'The Matrix', 'Goodfellas', 'One Flew Over the Cuckoo\'s Nest', 
        'Se7en', 'Seven Samurai', 'It\'s a Wonderful Life', 'The Silence of the Lambs', 'City of God', 
        'Saving Private Ryan', 'Interstellar', 'Parasite', 'The Green Mile', 'Life Is Beautiful', 'Spirited Away', 
        'Léon: The Professional', 'The Usual Suspects', 'The Lion King', 'The Pianist', 'Terminator 2: Judgment Day', 
        'Back to the Future', 'American History X', 'Modern Times', 'Psycho', 'Gladiator', 
        'City Lights', 'The Departed', 'The Prestige', 'Whiplash', 'Grave of the Fireflies', 
        'Casablanca', 'Once Upon a Time in the West', 'Rear Window', 'Cinema Paradiso', 'Apocalypse Now'
    ];

  for (const title of movieTitles) {
    console.log(`Fetching data for: ${title}`);
    const movieData = await fetchMovieFromOMDB(title);

    if (movieData) {
      await saveMovieToDatabase(movieData);
    }
  }
}

main()
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect());
