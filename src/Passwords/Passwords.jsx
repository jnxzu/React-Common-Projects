import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './Passwords.scss';

function Passwords() {
  const [length, setLength] = useState(8);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(false);
  const [num, setNum] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState('1234');

  const generatePassword = () => {
    const pw = [];

    const availableGroups = [];

    const lowerChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    if (lower) {
      availableGroups.push('lower');
      pw.push(_.sample(lowerChars));
    }
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    if (upper) {
      availableGroups.push('upper');
      pw.push(_.sample(upperChars));
    }
    const numChars = '0123456789'.split('');
    if (num) {
      availableGroups.push('num');
      pw.push(_.sample(numChars));
    }
    const specialChars = '!@#$%^&*()-_+=<,>.?'.split('');
    if (special) {
      availableGroups.push('special');
      pw.push(_.sample(specialChars));
    }

    if (availableGroups.length < 1) {
      setPassword('');
      return;
    }

    for (let i = availableGroups.length; i < length; i += 1) {
      const pickedGroup = _.sample(availableGroups);
      switch (pickedGroup) {
        case 'lower':
          pw.push(_.sample(lowerChars));
          break;

        case 'upper':
          pw.push(_.sample(upperChars));
          break;

        case 'num':
          pw.push(_.sample(numChars));
          break;

        case 'special':
          pw.push(_.sample(specialChars));
          break;

        default:
          break;
      }
    }

    setPassword(_.shuffle(pw).join(''));
  };

  useEffect(() => {
    generatePassword();
  }, [length, lower, upper, num, special]);

  return (
    <div id="password" className="password">
      <div className="password__center">
        <h1>{password}</h1>
        {(lower || upper || num || special) && (
          <button type="button" onClick={() => generatePassword()}>
            roll
          </button>
        )}
        <div className="password__center__controls">
          <div
            className="password__center__controls__len"
            onClick={() => {
              if (length > 4) setLength(length - 1);
            }}
          >
            -
          </div>
          <span>length {length}</span>
          <div
            className="password__center__controls__len"
            onClick={() => {
              if (length < 16) setLength(length + 1);
            }}
          >
            +
          </div>
        </div>
        <div className="password__center__controls">
          <div
            className={`password__center__controls__input ${
              lower ? 'ticked' : ''
            }`}
            onClick={() => setLower(!lower)}
          />
          <span>lowercase</span>
          <div
            className={`password__center__controls__input ${
              upper ? 'ticked' : ''
            }`}
            onClick={() => setUpper(!upper)}
          />
          <span>uppercase</span>
          <div
            className={`password__center__controls__input ${
              num ? 'ticked' : ''
            }`}
            onClick={() => setNum(!num)}
          />
          <span>number</span>
          <div
            className={`password__center__controls__input ${
              special ? 'ticked' : ''
            }`}
            onClick={() => setSpecial(!special)}
          />
          <span>special</span>
        </div>
      </div>
    </div>
  );
}

export default Passwords;
