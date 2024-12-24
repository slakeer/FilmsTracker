import express from 'express';
import { getGenres, getGenreById } from '../controllers/genre-controller.js';

const router = express.Router();
/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     description: Отримати жанр за ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID жанру
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Жанр знайдений
 *       404:
 *         description: Жанр не знайдений
 */
router.get('/:id', getGenreById);
/**
 * @swagger
 * /api/genres:
 *   get:
 *     description: Отримати список всіх жанрів
 *     responses:
 *       200:
 *         description: Список жанрів
 */
router.get('/', getGenres);
export default router;
