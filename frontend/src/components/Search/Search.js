import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=ccf56e50&s=${query}`);
        const data = await res.json();
        if (data.Search && Array.isArray(data.Search)) {
          setMovies(data.Search);
          setLoading(false);
        } else {
          throw new Error('No results found');
        }
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
        console.error('Error fetching movies:', error.message);
      }
    };
    fetchMovies();
  }, [query]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
