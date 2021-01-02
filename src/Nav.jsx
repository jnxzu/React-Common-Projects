import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './Nav.scss';

function Nav() {
  return (
    <nav className="nav">
      <NavHashLink smooth="true" to="/#todo">
        ToDo
      </NavHashLink>
      <NavHashLink smooth="true" to="/#weather">
        Weather
      </NavHashLink>
      <NavHashLink smooth="true" to="/#notes">
        Notes
      </NavHashLink>
      <NavHashLink smooth="true" to="/#quiz">
        Quiz
      </NavHashLink>
      <NavHashLink smooth="true" to="/#countdown">
        Countdown
      </NavHashLink>
      <NavHashLink smooth="true" to="/#recipes">
        Recipes
      </NavHashLink>
      <NavHashLink smooth="true" to="/#password">
        Password Generator
      </NavHashLink>
      <NavHashLink smooth="true" to="/#movies">
        Movies
      </NavHashLink>
      <NavHashLink smooth="true" to="/#github">
        Github Profiles
      </NavHashLink>
      <NavHashLink smooth="true" to="/#drawing">
        Drawing
      </NavHashLink>
    </nav>
  );
}

export default Nav;
