import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserProfile } from '../../api/UserApi';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userProfile = await getUserProfile();
        console.log('Fetched user profile:', userProfile); // Debugging
        setUser(userProfile);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        setError('Failed to load user profile');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://www.omdbapi.com/?apikey=ccf56e50&s=movie');
        const data = await response.json();
        setRecommendations(data.Search || []);
      } catch (error) {
        console.error('Error fetching movie recommendations:', error.message);
      }
    };

    fetchRecommendations();
  }, []);

  const showHomePage = () => {
    history.push('/dashboard');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name || 'Name not available'}</p>
        <p><strong>Email:</strong> {user.email || 'Email not available'}</p>
      </div>
      <h2>Movie Recommendations</h2>
      <div className="recommendations">
        {recommendations.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <a href={`/movie/${movie.imdbID}`} className="details-link">View Details</a>
            </div>
          </div>
        ))}
      </div>
      <button onClick={showHomePage}>Back to Home</button>
    </div>
  );
};

export default Profile;
