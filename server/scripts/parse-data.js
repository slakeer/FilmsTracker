import { fetchGenres } from './fetch-genres.js';
import { fetchMovies } from './fetch-movies.js';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
//перейди в директорію scripts і запусти node parse_data
dotenv.config({ path: '../.env' });
const prisma = new PrismaClient();

async function main() {
  await fetchGenres(prisma);
  const pages = 25;

  for (let page = 1; page <= pages; page++) {
    await fetchMovies(prisma, page);
  }
  console.log(
    'All movies have been fetched, stored, and associated with genres.'
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
