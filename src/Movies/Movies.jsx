/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Fade } from 'react-slideshow-image';
import _ from 'lodash';

import './Movies.scss';

function Movies() {
  const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    arrows: false,
    defaultIndex: _.random(0, 2),
    canSwipe: false,
    easing: 'ease-out',
    pauseOnHover: false,
  };

  return (
    <div id="movies" className="movies">
      <Fade {...fadeProperties}>
        <div className="movies__slide">
          <img src="movie1.png" alt="FORD v FERRARI" />
          <div className="m1-info">
            <h1>
              <span className="ford">FORD</span> v{' '}
              <span className="ferrari">FERRARI</span>
            </h1>
            <h2>Christian Bale&#160;&#160;&#160;&#160;&#160;Matt Damon</h2>
            <button type="button">watch now</button>
          </div>
        </div>
        <div className="movies__slide">
          <img src="movie2.jpg" alt="Parasite" />
          <div className="m2-info">
            <h1>Parasite</h1>
            <h2>
              a film by <span>bong joon ho</span>
            </h2>
            <button type="button">watch now</button>
          </div>
        </div>
        <div className="movies__slide">
          <img src="movie3.png" alt="Dunkirk" />
          <div className="m3-info">
            <h1>Dunkirk</h1>
            <button type="button">watch now</button>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Movies;
