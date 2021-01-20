import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import NotFound from './NotFound';

import ToDo from './ToDo/ToDo';
import Weather from './Weather/Weather';
import Notes from './Notes/Notes';
import Quiz from './Quiz/Quiz';
import Countdown from './Countdown/Countdown';
import Recipes from './Recipes/Recipes';
import Passwords from './Passwords/Passwords';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <ToDo />
            <Weather />
            <Notes />
            <Quiz />
            <Countdown />
            <Recipes />
            <Passwords />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
