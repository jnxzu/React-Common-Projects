import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './Recipes.scss';

function Recipes() {
  const [ready, setReady] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const options = {
      method: 'GET',
      url: 'https://tasty.p.rapidapi.com/recipes/list',
      params: {
        size: 10,
        from: _.random(1111),
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_TASTY_API_KEY,
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    };

    axios.request(options).then((res) => {
      setRecipes(res.data.results);
      setReady(true);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div id="recipes" className="recipes">
      {ready ? (
        <div className="recipes__container">
          {recipes.map((recipe) => (
            <a
              key={recipe.id}
              href={recipe.original_video_url || recipe.thumbnail_url}
              className="recipe"
            >
              <div className="recipe__name">
                <h1>{recipe.name}</h1>
              </div>
              <div className="recipe__image">
                <img alt={recipe.name} src={recipe.thumbnail_url} />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <img src="recipe_loading.gif" alt="loading" />
      )}
    </div>
  );
}

export default Recipes;
