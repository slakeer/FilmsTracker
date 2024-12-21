import prisma from '../../prisma/prisma_client.js';
export const getGenres = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany();
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};
