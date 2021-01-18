import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import _ from 'lodash';

import './Quiz.scss';

function Quiz() {
  const [question, setQuestion] = useState({});
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  const newQuestion = () => {
    setLoading(true);
    setTimeout(() => {
      const url = 'https://opentdb.com/api.php?amount=1&type=multiple';
      axios.get(url).then((res) => {
        if (
          res.data.results[0].category.includes('&') ||
          res.data.results[0].question.includes('&')
        )
          newQuestion();
        else {
          setQuestion({
            ...res.data.results[0],
            answers: _.shuffle([
              res.data.results[0].correct_answer,
              ...res.data.results[0].incorrect_answers,
            ]),
          });
          setLoading(false);
        }
      });
    }, 400);
  };

  const handleAnswer = () => {
    if (!answered) {
      setAnswered(true);
      setTimeout(() => {
        setAnswered(false);
        newQuestion();
      }, 2500);
    }
  };

  useEffect(() => {
    newQuestion();
  }, []);

  return (
    <div id="quiz" className="quiz">
      {!loading ? (
        <FadeIn className="quiz__question" visible={!loading}>
          <h3 className="quiz__question__category">{question.category}</h3>
          <h1 className="quiz__question__text">{question.question}</h1>
          {question.answers.map((ans) => (
            <div
              className={`quiz__question__answer ${
                ans === question.correct_answer ? 'correct' : 'wrong'
              } ${answered ? 'answered' : ''}`}
              onClick={handleAnswer}
            >
              {ans}
            </div>
          ))}
        </FadeIn>
      ) : (
        <img src="quiz_loading.gif" alt="loading..." />
      )}
    </div>
  );
}

export default Quiz;
