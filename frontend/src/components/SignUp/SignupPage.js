import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../api/UserApi';
import './SignupPage.css';

const SignupPage = ({ onLogin }) => { // Accept onLogin as a prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory hook

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerUser(name, email, password);
      console.log('User registered:', userData);
      localStorage.setItem('token', userData.token); // Save token to localStorage
      onLogin(); // Call onLogin to update login state
      history.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError('Registration failed'); // Display error message
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>} {/* Display error message */}
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;
