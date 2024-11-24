const express = require('express');
const { fetchPopularMovies, fetchMovieDetails } = require('../services/ombdService');
const router = express.Router();

router.get('/popular', async (req, res) => {
  try {
    const movies = await fetchPopularMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/movie/:id', async (req, res) => {
  try {
    const movieDetails = await fetchMovieDetails(req.params.id);
    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
