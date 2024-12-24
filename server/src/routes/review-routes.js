import express from 'express';
import {
  getReviews,
  getReviewsByUserId,
  getReviewsByMovieId,
  getReviewsByUserAndMovieId,
  deleteReview,
  createReview,
  updateReview
} from '../controllers/review-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Отримати всі відгуки
 *     description: Повертає список всіх відгуків у базі даних.
 *     responses:
 *       200:
 *         description: Успішно отримано список відгуків.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getReviews);

/**
 * @swagger
 * /api/reviews/user/{userId}:
 *   get:
 *     summary: Отримати відгуки за ID користувача
 *     description: Повертає всі відгуки, які залишив конкретний користувач.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID користувача
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успішно отримано відгуки.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/user/:userId', getReviewsByUserId);

/**
 * @swagger
 * /api/reviews/movie/{movieId}:
 *   get:
 *     summary: Отримати відгуки за ID фільму
 *     description: Повертає всі відгуки для конкретного фільму.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID фільму
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успішно отримано відгуки.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/movie/:movieId', getReviewsByMovieId);

/**
 * @swagger
 * /api/reviews/user/{userId}/movie/{movieId}:
 *   get:
 *     summary: Отримати відгуки за ID користувача та ID фільму
 *     description: Повертає відгуки для конкретного користувача і конкретного фільму.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID користувача
 *         schema:
 *           type: integer
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID фільму
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успішно отримано відгуки.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/user/:userId/movie/:movieId', getReviewsByUserAndMovieId);

/**
 * @swagger
 * /api/reviews/user/{userId}/movie/{movieId}:
 *   delete:
 *     summary: Видалити відгук за ID користувача та ID фільму
 *     description: Видаляє відгук, що належить конкретному користувачу для конкретного фільму.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID користувача
 *         schema:
 *           type: integer
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID фільму
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Відгук успішно видалено.
 *       404:
 *         description: Відгук не знайдено.
 */
router.delete('/user/:userId/movie/:movieId', deleteReview);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Створити новий відгук
 *     description: Додає новий відгук у базу даних.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *                 description: ID фільму
 *               user_id:
 *                 type: integer
 *                 description: ID користувача
 *               rating:
 *                 type: number
 *                 description: Рейтинг
 *               review_text:
 *                 type: string
 *                 description: Текст відгуку
 *               review_date:
 *                 type: string
 *                 format: date
 *                 description: Дата відгуку
 *     responses:
 *       201:
 *         description: Відгук успішно створено.
 */
router.post('/', createReview);

/**
 * @swagger
 * /api/reviews/user/{userId}/movie/{movieId}:
 *   put:
 *     summary: Оновити відгук
 *     description: Оновлює відгук для конкретного користувача та фільму.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID користувача
 *         schema:
 *           type: integer
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID фільму
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Новий рейтинг
 *               review_text:
 *                 type: string
 *                 description: Новий текст відгуку
 *               review_date:
 *                 type: string
 *                 format: date
 *                 description: Нова дата відгуку
 *     responses:
 *       200:
 *         description: Відгук успішно оновлено.
 *       404:
 *         description: Відгук не знайдено.
 */
router.put('/user/:userId/movie/:movieId', updateReview);

export default router;
