/* eslint-disable camelcase */
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import round from 'lodash/round';

import './Weather.scss';

function Weather() {
  const API =
    'https://thawing-peak-99201.herokuapp.com/https://www.metaweather.com/api/location';

  const [suggestions, setSuggestions] = useState([
    { title: 'London', woeid: 44418 },
    { title: 'Los Angeles', woeid: 2442047 },
  ]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [choice, setChoice] = useState({});

  const getSuggestions = (e) => {
    const q = e.target.value;
    if (q.length > 2)
      axios
        .get(`${API}/search/?query=${e.target.value}`)
        .then((res) =>
          setSuggestions(res.data.map(({ title, woeid }) => ({ title, woeid })))
        );
  };
  const getSuggestionsDebounced = debounce((e) => getSuggestions(e), 300);

  const getWeather = () => {
    if (choice.woeid) {
      setLoading(true);
      axios.get(`${API}/${choice.woeid}`).then((res) => {
        const {
          weather_state_name,
          the_temp,
        } = res.data.consolidated_weather[0];
        setWeather({
          loc: choice.title,
          weather: weather_state_name,
          temp: the_temp,
        });
        setLoading(false);
      });
    }
  };
  const getWeatherDebounced = debounce(getWeather, 300);

  useEffect(() => {
    getWeatherDebounced();
  }, [choice]);

  return (
    <div id="weather" className="weather">
      <div className="weather__container">
        <div className="weather__container__display">
          {loading ? (
            <img src="/weather_loading.gif" alt="Loading..." />
          ) : (
            weather.loc && (
              <>
                <h1>
                  {round(weather.temp, 0)}
                  <span>°C</span>
                </h1>
                <h3>{weather.weather}</h3>
                <h2>{weather.loc}</h2>
              </>
            )
          )}
        </div>
        <div className="weather__container__search">
          <input
            type="text"
            placeholder="Location"
            autoComplete="off"
            onChange={getSuggestionsDebounced}
          />
        </div>
        <div className="weather__container__suggestions">
          {suggestions.map((sug) => (
            <div
              key={sug.woeid}
              className="weather__container__suggestions__location"
              onClick={() => {
                setChoice(sug);
              }}
            >
              {sug.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
