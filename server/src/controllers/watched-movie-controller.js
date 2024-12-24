import prisma from '../../prisma/prisma_client.js';
export const getWatchedMoviesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const watchedMovies = await prisma.watchedMovie.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        movie: true
      }
    });

    res.status(200).json(watchedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch watched movies' });
  }
};
export const deleteWatchedMovie = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const deletedMovie = await prisma.watchedMovie.deleteMany({
      where: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      }
    });

    if (deletedMovie.count === 0) {
      return res.status(404).json({ error: 'Watched movie not found' });
    }

    res.status(200).json({ message: 'Watched movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete watched movie' });
  }
};

export const addWatchedMovie = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const movieExists = await prisma.movie.findUnique({
      where: { external_id: parseInt(movieId) }
    });

    if (!movieExists) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const newWatchedMovie = await prisma.watchedMovie.create({
      data: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      }
    });

    res.status(201).json(newWatchedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add watched movie' });
  }
};
