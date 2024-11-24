import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ addToWatchlist, rateProgram, ratings }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://www.omdbapi.com/?apikey=ccf56e50&s=movie');
        const data = await res.json();
        if (data.Search && Array.isArray(data.Search)) {
          const shuffledMovies = shuffleArray(data.Search);
          setMovies(shuffledMovies);
          setLoading(false);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchMovies();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleAddToWatchlist = (movie) => {
    addToWatchlist({ id: movie.imdbID, title: movie.Title, poster: movie.Poster });
  };

  const handleRateProgram = (movieId, rating) => {
    rateProgram(movieId, rating);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const renderMovieList = (categoryTitle) => (
    <div className="category">
      <h1>{categoryTitle}</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={`${movie.imdbID}-${index}`} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <button onClick={() => handleAddToWatchlist(movie)}>Add to Watchlist</button>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={ratings[movie.imdbID] === num ? 'selected' : ''}
                    onClick={() => handleRateProgram(movie.imdbID, num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <Link to={`/movie/${movie.imdbID}`} className="details-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      {renderMovieList('New Movies')}
      {renderMovieList('Popular Movies')}
      {renderMovieList('Rated Movies')}
    </div>
  );
};

export default Dashboard;
