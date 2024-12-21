import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movies.js';
import genreRoutes from './routes/genres.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/movies', movieRoutes);
app.use('/api/genres', genreRoutes);

export default app;
