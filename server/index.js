import dotenv from 'dotenv';
import app from './src/app.js';
dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
