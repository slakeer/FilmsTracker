import prisma from '../../prisma/prisma_client.js';
import { getMovies, getMovieById } from '../controllers/movie-controller.js';

jest.mock('../../prisma/prisma_client.js', () => ({
  movie: {
    findMany: jest.fn(),
    findUnique: jest.fn()
  }
}));

describe('Movie Controller', () => {
  describe('getMovies', () => {
    it('should return a list of movies with status 200', async () => {
      const mockMovies = [
        { id: 1, title: 'Movie 1', genre: 'Action' },
        { id: 2, title: 'Movie 2', genre: 'Comedy' }
      ];

      prisma.movie.findMany.mockResolvedValue(mockMovies);

      const req = { params: { startFrom: '1', range: '2' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMovies(req, res);

      expect(prisma.movie.findMany).toHaveBeenCalledWith({
        where: { id: { gte: 1 } },
        take: 2,
        include: {
          movie_genre: {
            include: { genre: true }
          }
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMovies);
    });

    it('should return status 500 if an error occurs', async () => {
      prisma.movie.findMany.mockRejectedValue(new Error('Database Error'));

      const req = { params: { startFrom: '1', range: '2' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMovies(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch movies'
      });
    });
  });

  describe('getMovieById', () => {
    it('should return the movie if it exists', async () => {
      const mockMovie = { id: 1, title: 'Movie 1', genre: 'Action' };

      prisma.movie.findUnique.mockResolvedValue(mockMovie);

      const req = { params: { id: '101' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMovieById(req, res);

      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { external_id: 101 },
        include: { movie_genre: { include: { genre: true } } }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMovie);
    });

    it('should return 404 if the movie does not exist', async () => {
      prisma.movie.findUnique.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMovieById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
    });

    it('should return 500 if an error occurs', async () => {
      prisma.movie.findUnique.mockRejectedValue(new Error('Database Error'));

      const req = { params: { id: '101' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMovieById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
