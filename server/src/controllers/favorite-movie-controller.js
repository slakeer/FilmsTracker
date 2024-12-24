import prisma from '../../prisma/prisma_client.js';

export const getFavoriteMoviesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const favoriteMovies = await prisma.favoriteMovie.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        movie: true
      }
    });

    res.status(200).json(favoriteMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorite movies' });
  }
};

export const deleteFavoriteMovie = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const deletedMovie = await prisma.favoriteMovie.deleteMany({
      where: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      }
    });

    if (deletedMovie.count === 0) {
      return res.status(404).json({ error: 'Favorite movie not found' });
    }

    res.status(200).json({ message: 'Favorite movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete favorite movie' });
  }
};

export const addFavoriteMovie = async (req, res) => {
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

    const newFavoriteMovie = await prisma.favoriteMovie.create({
      data: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      }
    });

    res.status(201).json(newFavoriteMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite movie' });
  }
};
