import prisma from '../../prisma/prisma_client.js';
export const getMovies = async (req, res) => {
  const { startFrom, range } = req.params;
  try {
    const movies = await prisma.movie.findMany({
      where: {
        id: {
          gte: parseInt(startFrom)
        }
      },
      take: parseInt(range),
      include: {
        movie_genre: {
          include: {
            genre: true
          }
        }
      }
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        external_id: parseInt(id)
      },
      include: {
        movie_genre: {
          include: {
            genre: true
          }
        }
      }
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
