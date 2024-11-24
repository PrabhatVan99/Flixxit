import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Rating.css'; // Ensure Rating.css is properly styled

const Rating = ({ ratings, removeIt }) => {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async (movieId) => {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=ccf56e50&i=${movieId}`);
        const data = await res.json();
        setMovieDetails((prevDetails) => ({
          ...prevDetails,
          [movieId]: {
            title: data.Title,
            poster: data.Poster,
          },
        }));
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    // Fetch details for each movie in ratings
    Object.keys(ratings).forEach((movieId) => {
      if (!movieDetails[movieId]) {
        fetchMovieDetails(movieId);
      }
    });
  }, [ratings]);

  return (
    <div className="ratings">
      <h1>My Ratings</h1>
      {Object.keys(ratings).length === 0 ? (
        <p>You haven't rated any programs yet.</p>
      ) : (
        <div className="rating-items">
          {Object.entries(ratings).map(([movieId, rating]) => (
            <div key={movieId} className="rating-item">
              {movieDetails[movieId] ? (
                <div className="rating-content">
                  <img src={movieDetails[movieId].poster} alt={movieDetails[movieId].title} className="rating-poster" />
                  <div className="rating-info">
                    <h3>{movieDetails[movieId].title}</h3>
                    <p>Current Rating: {rating}</p>
                    <button onClick={() => removeIt(movieId)}>Remove</button>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Rating.propTypes = {
  ratings: PropTypes.object.isRequired,
  removeIt: PropTypes.func.isRequired,
};

export default Rating;
