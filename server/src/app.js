import express from 'express';
import passport from "passport";
// import bodyParser from 'body-parser';
import movieRoutes from './routes/movie-routes.js';
import genreRoutes from './routes/genre-routes.js';
import watchedMoviesRoutes from './routes/watched-movie-routes.js';
import favoriteMoviesRoutes from './routes/favorite-movie-routes.js';
import reviewRoutes from './routes/review-routes.js';
import authRoutes from './routes/auth-routes.js';

import { swaggerDocs, swaggerUi } from './swagger-options.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/movies', movieRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/watched-movies', watchedMoviesRoutes);
app.use('/api/favorite-movies', favoriteMoviesRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
export default app;
