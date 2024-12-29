import {
  getReviews,
  getReviewsByUserId,
  createReview
} from '../controllers/review-controller.js';
import prisma from '../../prisma/prisma_client.js';

jest.mock('../../prisma/prisma_client.js', () => ({
  review: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn()
  }
}));

describe('ReviewController', () => {
  describe('getReviews', () => {
    it('returns a list of reviews from the database', async () => {
      const mockReviews = [
        { id: 1, review_text: 'Great movie!', rating: 5 },
        { id: 2, review_text: 'Not bad', rating: 3 }
      ];
      prisma.review.findMany.mockResolvedValue(mockReviews);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getReviews(req, res);

      expect(prisma.review.findMany).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });

    it('returns an error if unable to fetch reviews', async () => {
      prisma.review.findMany.mockRejectedValue(new Error('Database error'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch reviews'
      });
    });
  });

  describe('getReviewsByUserId', () => {
    it('returns reviews for a specific user', async () => {
      const userId = 1;
      const mockReviews = [
        { id: 1, review_text: 'Great movie!', rating: 5 },
        { id: 2, review_text: 'Not bad', rating: 3 }
      ];
      prisma.review.findMany.mockResolvedValue(mockReviews);

      const req = { params: { userId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getReviewsByUserId(req, res);

      expect(prisma.review.findMany).toHaveBeenCalledWith({
        where: { user_id: userId }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });

    it('returns an error if unable to fetch reviews for the user', async () => {
      const userId = 1;
      prisma.review.findMany.mockRejectedValue(new Error('Database error'));

      const req = { params: { userId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getReviewsByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch reviews by user ID'
      });
    });
  });

  describe('createReview', () => {
    it('creates a new review', async () => {
      const newReviewData = {
        movie_id: 1,
        user_id: 1,
        rating: 5,
        review_text: 'Amazing movie!',
        review_date: '2024-12-29'
      };

      const newReview = { id: 1, ...newReviewData };
      prisma.review.create.mockResolvedValue(newReview);

      const req = { body: newReviewData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReview(req, res);

      expect(prisma.review.create).toHaveBeenCalledWith({
        data: {
          ...newReviewData,
          review_date: new Date(newReviewData.review_date)
        }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newReview);
    });

    it('returns an error if unable to create a review', async () => {
      const newReviewData = {
        movie_id: 1,
        user_id: 1,
        rating: 5,
        review_text: 'Amazing movie!',
        review_date: '2024-12-29'
      };

      prisma.review.create.mockRejectedValue(new Error('Database error'));

      const req = { body: newReviewData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create review'
      });
    });
  });
});
