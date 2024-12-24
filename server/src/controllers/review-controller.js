import prisma from '../../prisma/prisma_client.js';

export const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getReviewsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { user_id: parseInt(userId) }
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews by user ID' });
  }
};

export const getReviewsByMovieId = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { movie_id: parseInt(movieId) }
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews by movie ID' });
  }
};

export const getReviewsByUserAndMovieId = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      }
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Failed to fetch reviews by user and movie IDs' });
  }
};

export const deleteReview = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    await prisma.review.deleteMany({
      where: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      }
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

export const createReview = async (req, res) => {
  const { movie_id, user_id, rating, review_text, review_date } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: {
        movie_id: parseInt(movie_id),
        user_id: parseInt(user_id),
        rating,
        review_text,
        review_date: new Date(review_date)
      }
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const updateReview = async (req, res) => {
  const { userId, movieId } = req.params;
  const { rating, review_text, review_date } = req.body;
  try {
    const updatedReview = await prisma.review.updateMany({
      where: {
        user_id: parseInt(userId),
        movie_id: parseInt(movieId)
      },
      data: {
        rating,
        review_text,
        review_date: new Date(review_date)
      }
    });
    if (updatedReview.count === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};
