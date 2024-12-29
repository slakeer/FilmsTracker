import { getGenres, getGenreById } from '../controllers/genre-controller.js';
import prisma from '../../prisma/prisma_client.js';

jest.mock('../../prisma/prisma_client.js', () => ({
  genre: {
    findMany: jest.fn(),
    findUnique: jest.fn()
  }
}));

describe('Genre Controller', () => {
  describe('getGenres', () => {
    it('should return a list of genres with status 200', async () => {
      const mockGenres = [
        { id: 1, genre_name: 'Action', external_id: 12 },
        { id: 2, genre_name: 'Comedy', external_id: 10 }
      ];
      prisma.genre.findMany.mockResolvedValue(mockGenres);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getGenres(req, res);

      expect(prisma.genre.findMany).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGenres);
    });

    it('should return status 500 if an error occurs', async () => {
      prisma.genre.findMany.mockRejectedValue(new Error('Database Error'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await getGenres(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch genres'
      });
    });
  });

  describe('getGenreById', () => {
    it('should return the genre if it exists', async () => {
      const mockGenre = { id: 1, genre_name: 'Action', external_id: 1 };
      prisma.genre.findUnique.mockResolvedValue(mockGenre);

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getGenreById(req, res);

      expect(prisma.genre.findUnique).toHaveBeenCalledWith({
        where: { external_id: 1 }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGenre);
    });

    it('should return 404 if the genre does not exist', async () => {
      prisma.genre.findUnique.mockResolvedValue(null);

      const req = { params: { id: '99' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getGenreById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Genre not found' });
    });

    it('should return 500 if an error occurs', async () => {
      prisma.genre.findUnique.mockRejectedValue(new Error('Database Error'));

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getGenreById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
