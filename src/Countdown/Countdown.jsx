/* eslint-disable no-unused-expressions */
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';

import './Countdown.scss';

function Countdown() {
  const inputRef = useRef(null);

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

      if (days || hours || minutes || seconds) {
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
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
              ref={inputRef}
              min={moment().add(1, 'd').format('YYYY-MM-DD')}
            />
            <button
              type="submit"
              onClick={() => {
                setTargetDate(moment(inputRef.current.value));
                setButtonText('one second...');
                setTimeout(() => {
                  setShowCountdown(true);
                }, 1250);
              }}
            >
              {buttonText}
            </button>
            <span>
              only date because mozilla cant support what&#39;s in{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local">
                their own docs
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Countdown;
