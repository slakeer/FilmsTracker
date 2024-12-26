import express from 'express';
import { getMovies, getMovieById } from '../controllers/movie-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/movies/{startFrom}/{range}:
 *   get:
 *     description: Отримати список фільмів з можливістю пагінації
 *     parameters:
 *       - name: startFrom
 *         in: path
 *         description: ID фільму, з якого почати вибірку
 *         required: true
 *         type: integer
 *       - name: range
 *         in: path
 *         description: Кількість фільмів, які потрібно повернути
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Список фільмів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Movie'
 *       500:
 *         description: Помилка сервера
 */
router.get('/:startFrom/:range', getMovies);

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
