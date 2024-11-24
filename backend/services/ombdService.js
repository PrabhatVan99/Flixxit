const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

const fetchPopularMovies = async () => {
  // Example: fetching movies with a search keyword, as OMDb doesn't have a "popular" endpoint
  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: 'star wars',  // Use a popular keyword to simulate popular movies
        type: 'movie'
      },
    });
    return response.data.Search;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        i: movieId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

module.exports = {
  fetchPopularMovies,
  fetchMovieDetails,
};
