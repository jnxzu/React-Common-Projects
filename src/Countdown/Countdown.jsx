/* eslint-disable no-unused-expressions */
import { set } from 'lodash';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';

import './Countdown.scss';

function Countdown() {
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const [buttonText, setButtonText] = useState('ok');
  const [showCountdown, setShowCountdown] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const updateTimeLeft = () => {
    if (targetDate) {
      const duration = moment.duration(targetDate.diff(moment()));
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
        setShowCountdown(true);
      } else {
        setTargetDate(null);
        setShowCountdown(false);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeLeft();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <div id="countdown" className="countdown">
      <div className="countdown__center">
        {showCountdown ? (
          <>
            <h1>
              {timeLeft.days} <span>day{timeLeft.days !== 1 && 's'} </span>
              {timeLeft.hours} <span>hour{timeLeft.hours !== 1 && 's'} </span>
              {timeLeft.minutes}{' '}
              <span>minute{timeLeft.minutes !== 1 && 's'} </span>
              {timeLeft.seconds}{' '}
              <span>second{timeLeft.seconds !== 1 && 's'}</span>
            </h1>
          </>
        ) : (
          <div className="countdown__center__input">
            <input
              type="date"
              ref={dateRef}
              min={moment().format('YYYY-MM-DD')}
            />
            <input type="time" ref={timeRef} />
            <button
              type="submit"
              onClick={() => {
                setButtonText('one second...');
                setTimeout(() => {
                  setTargetDate(
                    moment(`${dateRef.current.value} ${timeRef.current.value}`)
                  );
                  setButtonText('ok');
                }, 1250);
              }}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Countdown;
