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
export const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        external_id: parseInt(id)
      }
    });

    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    return res.status(200).json(genre);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
