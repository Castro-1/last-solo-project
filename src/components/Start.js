import React from "react";

export default function Start(props) {
  const { startQuiz } = props;
  return (
    <div className="start">
      <h1 className="start-title">Quizzical</h1>
      <p className="start-description">Welcome to the most fun trivia quiz!</p>
      <button className="start-button" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
