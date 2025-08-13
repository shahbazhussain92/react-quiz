import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data.js';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const question = data[index];

  const selectOption = (n) => {
    if (locked) return;
    setSelected(n);
    setLocked(true);
    if (n === question.ans) {
      setScore(score + 1); // ✅ increase score for correct answer
    }
  };

  const nextQuestion = () => {
    if (!locked) return;

    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelected(null);
      setLocked(false);
    } else {
      setShowScore(true); // ✅ show final score at the end
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setShowScore(false);
  };

  const optionClass = (n) => {
    if (!locked) return "";
    if (n === selected) {
      return selected === question.ans ? "correct" : "wrong";
    }
    return "disabled";
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {data.length}</h2>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>

          <ul>
            <li className={optionClass(1)} onClick={() => selectOption(1)}>{question.option1}</li>
            <li className={optionClass(2)} onClick={() => selectOption(2)}>{question.option2}</li>
            <li className={optionClass(3)} onClick={() => selectOption(3)}>{question.option3}</li>
            <li className={optionClass(4)} onClick={() => selectOption(4)}>{question.option4}</li>
          </ul>

          <button onClick={nextQuestion} disabled={!locked}>Next</button>
          <div className="index">{index + 1} of {data.length} Questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
