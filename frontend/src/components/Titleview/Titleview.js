import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Titleview.css';

const TitleView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`http://www.omdbapi.com/?apikey=ccf56e50&i=${id}`);
        setMovie(res.data);
      } catch (error) {
        setError('Failed to fetch movie details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>{error}</div>;

  const trailerUrl = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`; // Replace with actual movie trailer URL

  return (
    <div className="title-view">
      <h1>{movie.Title}</h1>
      <div className="movie-details">
        <img src={movie.Poster} alt={movie.Title} />
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      </div>
      <div className="video-player">
        <ReactPlayer url={trailerUrl} controls={true} />
      </div>
    </div>
  );
};

export default TitleView;
