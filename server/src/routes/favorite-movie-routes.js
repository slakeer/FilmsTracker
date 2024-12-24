import express from 'express';
import {
  getFavoriteMoviesByUserId,
  deleteFavoriteMovie,
  addFavoriteMovie
} from '../controllers/favorite-movie-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/favorite-movies/{userId}:
 *   get:
 *     summary: Get favorite movies by user ID
 *     description: Fetches all favorite movies for a given user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of favorite movies
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/FavoriteMovie'
 *       500:
 *         description: Failed to fetch favorite movies
 */
router.get('/:userId', getFavoriteMoviesByUserId);

/**
 * @swagger
 * /api/favorite-movies/{userId}/{movieId}:
 *   delete:
 *     summary: Delete a movie from the user's favorites
 *     description: Deletes a specific movie from the user's favorite list by movie ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         type: integer
 *       - name: movieId
 *         in: path
 *         description: The ID of the movie to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Favorite movie deleted successfully
 *       404:
 *         description: Favorite movie not found
 *       500:
 *         description: Failed to delete favorite movie
 */
router.delete('/:userId/:movieId', deleteFavoriteMovie);

/**
 * @swagger
/**
 * @swagger
 * /api/favorite-movies:
 *   post:
 *     summary: Add a movie to the user's favorites
 *     description: Adds a movie to the user's favorite list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               movieId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Favorite movie added successfully
 *       404:
 *         description: User or movie not found
 *       500:
 *         description: Failed to add favorite movie
 */
router.post('/', addFavoriteMovie);
router.post('/', addFavoriteMovie);

export default router;
