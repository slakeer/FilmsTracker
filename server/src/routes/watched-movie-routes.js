import express from 'express';
import {
  getWatchedMoviesByUserId,
  deleteWatchedMovie,
  addWatchedMovie
} from '../controllers/watched-movie-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/watched-movies/{userId}:
 *   get:
 *     summary: Get watched movies by user ID
 *     description: Fetches all watched movies for a given user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of watched movies
 *       500:
 *         description: Failed to fetch watched movies
 */
router.get('/:userId', getWatchedMoviesByUserId);

/**
 * @swagger
 * /api/watched-movies/{userId}/{movieId}:
 *   delete:
 *     summary: Delete a watched movie
 *     description: Deletes a specific movie from the user's watched list by movie ID.
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
 *         description: Watched movie deleted successfully
 *       404:
 *         description: Watched movie not found
 *       500:
 *         description: Failed to delete watched movie
 */
router.delete('/:userId/:movieId', deleteWatchedMovie);

/**
 * @swagger
 * /api/watched-movies:
 *   post:
 *     summary: Add a movie to the user's watched
 *     description: Adds a movie to the user's watched list.
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
 *         description: Watched movie added successfully
 *       404:
 *         description: User or movie not found
 *       500:
 *         description: Failed to add watched movie
 */
router.post('/', addWatchedMovie);

export default router;
