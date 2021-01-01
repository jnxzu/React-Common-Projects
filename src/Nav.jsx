import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="#todo">ToDo</NavLink>
      <NavLink to="#weather">Weather</NavLink>
      <NavLink to="#notes">Notes</NavLink>
      <NavLink to="#quiz">Quiz</NavLink>
      <NavLink to="#countdown">Countdown</NavLink>
      <NavLink to="#recipes">Recipes</NavLink>
      <NavLink to="#password">Password Generator</NavLink>
      <NavLink to="#movies">Movies</NavLink>
      <NavLink to="#github">Github Profiles</NavLink>
      <NavLink to="#drawing">Drawing</NavLink>
    </nav>
  );
}

export default Nav;
