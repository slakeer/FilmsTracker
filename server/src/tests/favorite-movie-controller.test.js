import prisma from '../../prisma/prisma_client.js';
import {
    getFavoriteMoviesByUserId,
    deleteFavoriteMovie,
    addFavoriteMovie
  } from '../controllers/favorite-movie-controller.js';
jest.mock('../../prisma/prisma_client.js', () => ({
  favoriteMovie: {
    findMany: jest.fn(),
    deleteMany: jest.fn(),
    create: jest.fn()
  },
  user: {
    findUnique: jest.fn()
  },
  movie: {
    findUnique: jest.fn()
  }
}));

describe('FavoriteMovieController', () => {
  describe('getFavoriteMoviesByUserId', () => {
    it('returns a list of favorite movies for a specific user', async () => {
      const userId = 1;
      const mockFavoriteMovies = [
        { id: 1, user_id: userId, movie_id: 1, movie: { title: 'Inception', genre: 'Sci-Fi' } },
        { id: 2, user_id: userId, movie_id: 2, movie: { title: 'The Dark Knight', genre: 'Action' } }
      ];
      prisma.favoriteMovie.findMany.mockResolvedValue(mockFavoriteMovies);

      const req = { params: { userId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getFavoriteMoviesByUserId(req, res);

      expect(prisma.favoriteMovie.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
        include: { movie: true }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockFavoriteMovies);
    });

    it('returns an error if unable to fetch favorite movies', async () => {
      const userId = 1;
      prisma.favoriteMovie.findMany.mockRejectedValue(new Error('Database error'));

      const req = { params: { userId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getFavoriteMoviesByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch favorite movies' });
    });
  });

  describe('deleteFavoriteMovie', () => {
    it('deletes a favorite movie for a user', async () => {
      const userId = 1;
      const movieId = 1;
      const mockDeletedMovie = { count: 1 };
      prisma.favoriteMovie.deleteMany.mockResolvedValue(mockDeletedMovie);

      const req = { params: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteFavoriteMovie(req, res);

      expect(prisma.favoriteMovie.deleteMany).toHaveBeenCalledWith({
        where: { user_id: userId, movie_id: movieId }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Favorite movie deleted successfully' });
    });

    it('returns an error if the favorite movie is not found', async () => {
      const userId = 1;
      const movieId = 1;
      prisma.favoriteMovie.deleteMany.mockResolvedValue({ count: 0 });

      const req = { params: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteFavoriteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Favorite movie not found' });
    });

    it('returns an error if unable to delete the favorite movie', async () => {
      const userId = 1;
      const movieId = 1;
      prisma.favoriteMovie.deleteMany.mockRejectedValue(new Error('Database error'));

      const req = { params: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteFavoriteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete favorite movie' });
    });
  });

  describe('addFavoriteMovie', () => {
    it('adds a movie to the user\'s favorite list', async () => {
      const userId = 1;
      const movieId = 1;
      const mockUser = { id: userId };
      const mockMovie = { external_id: movieId };
      const mockNewFavoriteMovie = { id: 1, user_id: userId, movie_id: movieId };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.movie.findUnique.mockResolvedValue(mockMovie);
      prisma.favoriteMovie.create.mockResolvedValue(mockNewFavoriteMovie);

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addFavoriteMovie(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
      expect(prisma.movie.findUnique).toHaveBeenCalledWith({ where: { external_id: movieId } });
      expect(prisma.favoriteMovie.create).toHaveBeenCalledWith({
        data: { user_id: userId, movie_id: movieId }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewFavoriteMovie);
    });

    it('returns an error if the user is not found', async () => {
      const userId = 1;
      const movieId = 1;
      prisma.user.findUnique.mockResolvedValue(null);

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addFavoriteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('returns an error if the movie is not found', async () => {
      const userId = 1;
      const movieId = 1;
      const mockUser = { id: userId };
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.movie.findUnique.mockResolvedValue(null);

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addFavoriteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
    });

    it('returns an error if unable to add the favorite movie', async () => {
      const userId = 1;
      const movieId = 1;
      const mockUser = { id: userId };
      const mockMovie = { external_id: movieId };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.movie.findUnique.mockResolvedValue(mockMovie);
      prisma.favoriteMovie.create.mockRejectedValue(new Error('Database error'));

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addFavoriteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to add favorite movie' });
    });
  });
});