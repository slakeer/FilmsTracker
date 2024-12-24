import express from 'express';
import { getMovies, getMovieById } from '../controllers/movie-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Отримати список всіх фільмів
 *     responses:
 *       200:
 *         description: Список фільмів
 */
router.get('/', getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     description: Отримати фільм за ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID фільму
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Фільм знайдений
 *       404:
 *         description: Фільм не знайдений
 */
router.get('/:id', getMovieById);

export default router;
