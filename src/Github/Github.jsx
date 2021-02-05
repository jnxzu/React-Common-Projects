import React, { useState, useRef } from 'react';
import axios from 'axios';
import randomColor from 'randomcolor';

import './Github.scss';

function Github() {
  const api = 'https://api.github.com/users/';
  const searchRef = useRef();

  const [color, setColor] = useState(randomColor({ luminosity: 'light' }));

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    login: 'jnxzu',
    id: 35338262,
    node_id: 'MDQ6VXNlcjM1MzM4MjYy',
    avatar_url: 'https://avatars.githubusercontent.com/u/35338262?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/jnxzu',
    html_url: 'https://github.com/jnxzu',
    followers_url: 'https://api.github.com/users/jnxzu/followers',
    following_url: 'https://api.github.com/users/jnxzu/following{/other_user}',
    gists_url: 'https://api.github.com/users/jnxzu/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/jnxzu/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/jnxzu/subscriptions',
    organizations_url: 'https://api.github.com/users/jnxzu/orgs',
    repos_url: 'https://api.github.com/users/jnxzu/repos',
    events_url: 'https://api.github.com/users/jnxzu/events{/privacy}',
    received_events_url: 'https://api.github.com/users/jnxzu/received_events',
    type: 'User',
    site_admin: false,
    name: 'Janek Bielówka',
    company: null,
    blog: '',
    location: 'Gdańsk',
    email: null,
    hireable: null,
    bio: ':^)',
    twitter_username: null,
    public_repos: 17,
    public_gists: 0,
    followers: 6,
    following: 2,
    created_at: '2018-01-11T14:03:22Z',
    updated_at: '2020-12-31T00:57:14Z',
  });
  const [error, setError] = useState(false);

  const getUser = () => {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setColor(randomColor({ luminosity: 'bright' }));
      axios
        .get(api + searchRef.current?.value)
        .then((res) => {
          setLoading(false);
          setUser(res.data);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }, 1500);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') getUser();
  };

  return (
    <div id="github" className="github">
      <div className="github__container">
        <div className="github__container__search">
          <input
            type="text"
            defaultValue="jnxzu"
            ref={searchRef}
            onKeyDown={handleEnter}
          />
          <button
            type="button"
            onClick={getUser}
            className={loading ? 'loading' : ''}
            disabled={loading}
          >
            🔍
          </button>
        </div>
        <img src="github_loading.gif" alt="Loading..." />
        <div
          className={`github__container__card ${
            loading && !error ? '' : 'visible'
          }`}
        >
          <div className="github__container__card__inner">
            <div
              className="github__container__card__inner__top"
              style={{ background: color }}
            />
            <img
              src={user.avatar_url}
              alt="avatar"
              onClick={function goToProfile() {
                window.location.href = user.html_url;
              }}
            />
            <div className="github__container__card__inner__bottom">
              <h1>{user.name}</h1>
              <h3>{user.login}</h3>
              <p>{user.bio}</p>
              <div className="github__container__card__inner__bottom__squares">
                <div
                  onClick={function goToRepos() {
                    window.location.href = `https://github.com/${user.login}?tab=repositories`;
                  }}
                >
                  <h2>Repositories</h2>
                  <h3>{user.public_repos}</h3>
                </div>
                <div
                  onClick={function goToFollowers() {
                    window.location.href = `https://github.com/${user.login}?tab=followers`;
                  }}
                >
                  <h2>Followers</h2>
                  <h3>{user.followers}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className={`github__container__error ${error ? 'visible' : ''}`}>
          Cannot find GitHub user {searchRef.current?.value}
        </h1>
      </div>
    </div>
  );
}

export default Github;
