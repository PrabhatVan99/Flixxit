import React, { useState, useEffect } from 'react';
import './Watchlist.css'; // Ensure Watchlist.css is properly styled

const Watchlist = ({ watchlist, removeFromWatchlist }) => {
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

    // Fetch details for each movie in watchlist
    watchlist.forEach((movie) => {
      if (!movieDetails[movie.id]) {
        fetchMovieDetails(movie.id);
      }
    });
  }, [watchlist]);

  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="watchlist-items">
          {watchlist.map((item, index) => (
            <div key={`${item.id}-${index}`} className="watchlist-item">
              {movieDetails[item.id] ? (
                <div className="watchlist-content">
                  <img src={movieDetails[item.id].poster} alt={movieDetails[item.id].title} className="watchlist-poster" />
                  <div className="watchlist-info">
                    <h3>{movieDetails[item.id].title}</h3>
                    <button onClick={() => removeFromWatchlist(item.id)}>Remove</button>
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

export default Watchlist;
