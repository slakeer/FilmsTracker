import {
  getWatchedMoviesByUserId,
  deleteWatchedMovie,
  addWatchedMovie
} from '../controllers/watched-movie-controller.js';
import prisma from '../../prisma/prisma_client.js';

jest.mock('../../prisma/prisma_client.js', () => ({
  watchedMovie: {
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

describe('WatchedMovieController', () => {
  describe('getWatchedMoviesByUserId', () => {
    it('returns a list of watched movies for the user', async () => {
      const userId = 1;
      const mockWatchedMovies = [
        { id: 1, user_id: 1, movie_id: 101, movie: { title: 'Movie 1' } },
        { id: 2, user_id: 1, movie_id: 102, movie: { title: 'Movie 2' } }
      ];
      prisma.watchedMovie.findMany.mockResolvedValue(mockWatchedMovies);

      const req = { params: { userId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getWatchedMoviesByUserId(req, res);

      expect(prisma.watchedMovie.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
        include: { movie: true }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockWatchedMovies);
    });

    it('returns an error if failed to fetch watched movies', async () => {
      prisma.watchedMovie.findMany.mockRejectedValue(
        new Error('Database error')
      );

      const req = { params: { userId: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getWatchedMoviesByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch watched movies'
      });
    });
  });

  describe('deleteWatchedMovie', () => {
    it('deletes a watched movie for the user', async () => {
      const userId = 1;
      const movieId = 101;
      prisma.watchedMovie.deleteMany.mockResolvedValue({ count: 1 });

      const req = { params: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteWatchedMovie(req, res);

      expect(prisma.watchedMovie.deleteMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          movie_id: movieId
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Watched movie deleted successfully'
      });
    });

    it('returns an error if movie not found', async () => {
      const userId = 1;
      const movieId = 101;
      prisma.watchedMovie.deleteMany.mockResolvedValue({ count: 0 });

      const req = { params: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteWatchedMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Watched movie not found'
      });
    });

    it('returns an error if failed to delete watched movie', async () => {
      prisma.watchedMovie.deleteMany.mockRejectedValue(
        new Error('Database error')
      );

      const req = { params: { userId: '1', movieId: '101' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteWatchedMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to delete watched movie'
      });
    });
  });

  describe('addWatchedMovie', () => {
    it('adds a watched movie for the user', async () => {
      const userId = 1;
      const movieId = 101;
      const mockUser = { id: 1, name: 'John Doe' };
      const mockMovie = { external_id: 101, title: 'Movie 1' };
      const newWatchedMovie = { user_id: 1, movie_id: 101 };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.movie.findUnique.mockResolvedValue(mockMovie);
      prisma.watchedMovie.create.mockResolvedValue(newWatchedMovie);

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addWatchedMovie(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      });
      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { external_id: movieId }
      });
      expect(prisma.watchedMovie.create).toHaveBeenCalledWith({
        data: { user_id: userId, movie_id: movieId }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newWatchedMovie);
    });

    it('returns an error if user not found', async () => {
      const userId = 1;
      const movieId = 101;
      prisma.user.findUnique.mockResolvedValue(null);

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addWatchedMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('returns an error if movie not found', async () => {
      const userId = 1;
      const movieId = 101;
      prisma.user.findUnique.mockResolvedValue({ id: 1 });
      prisma.movie.findUnique.mockResolvedValue(null);

      const req = { body: { userId, movieId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addWatchedMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
    });

    it('returns an error if failed to add watched movie', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1 });
      prisma.movie.findUnique.mockResolvedValue({ external_id: 101 });
      prisma.watchedMovie.create.mockRejectedValue(new Error('Database error'));

      const req = { body: { userId: '1', movieId: '101' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await addWatchedMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to add watched movie'
      });
    });
  });
});
