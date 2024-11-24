import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import TitleView from './components/Titleview/Titleview';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignUp/SignupPage';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';
import Watchlist from './components/Watchlist/Watchlist';
import Rating from './components/Rating/Rating';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [watchlist, setWatchlist] = React.useState([]);
  const [ratings, setRatings] = React.useState({});

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const addToWatchlist = (program) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, program]);
  };

  const removeFromWatchlist = (programId) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== programId));
  };

  const rateProgram = (programId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [programId]: rating,
    }));
  };

  const removeIt = (programId) => {
    const updatedRatings = { ...ratings };
    delete updatedRatings[programId];
    setRatings(updatedRatings);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        <Switch>
          <Route path="/dashboard">
            {isLoggedIn ? (
              <Dashboard
                addToWatchlist={addToWatchlist}
                rateProgram={rateProgram}
                ratings={ratings}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/profile">
            {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/movie/:id">
            {isLoggedIn ? <TitleView /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/signup">
            {!isLoggedIn ? <SignupPage onLogin={handleLogin} /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="/watchlist">
            {isLoggedIn ? (
              <Watchlist
                watchlist={watchlist}
                removeFromWatchlist={removeFromWatchlist}
                ratings={ratings}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/rating">
            {isLoggedIn ? (
              <Rating ratings={ratings} removeIt={removeIt} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Redirect exact from="/" to={isLoggedIn ? '/dashboard' : '/login'} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
