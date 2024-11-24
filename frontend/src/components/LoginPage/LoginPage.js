import React, { useState } from 'react';
import { loginUser } from '../../api/UserApi';
import { useHistory, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userData = await loginUser(email, password);
      console.log('User logged in:', userData);
      localStorage.setItem('token', userData.token); // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(userData.user)); // Save user data to localStorage
      onLogin(); // Call onLogin to update login state
      history.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message || 'Login failed'); // Display specific error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>New user? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default LoginPage;
