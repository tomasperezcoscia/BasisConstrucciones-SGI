import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To prevent flickering or unwanted redirects while checking

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await axios.get('../services/authentication/user-is-logged');
        setIsAuthenticated(response.data); // Assumes your endpoint returns a boolean
      } catch (error) {
        console.error("Error checking user's authentication status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner you prefer
  }

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/home" component={HomePage} authenticated={isAuthenticated} />
        <Redirect from="/" to={isAuthenticated ? "/home" : "/login"} />
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    authenticated ? <Component {...props} /> : <Redirect to="/login" />
  )} />
);

export default App;
