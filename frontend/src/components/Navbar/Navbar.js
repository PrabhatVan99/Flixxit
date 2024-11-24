import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      history.push(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Flixxit</h1>
      </div>
      <div className="nav-links">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li className="nav-item">
          <Link to="/watchlist">Watchlist</Link>
        </li>
        <li className="nav-item">
          <Link to="/rating">Ratings</Link>
        </li>
          
          <li>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
              {isLoggedIn ? (
            <li><button onClick={onLogout}>Logout</button></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
