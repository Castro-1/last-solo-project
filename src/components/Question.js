import React from "react";
import Option from "./Option";

export default function Question(props) {
  const { question, handleChange, submitted } = props;

  function options() {
    const options = [question.correct];
    question.incorrect.forEach((answer) =>
      options.push(answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'"))
    );
    options.sort().reverse();

    return options.map((option) => (
      <Option
        key={option}
        value={option}
        name={question.question}
        question={question}
        handleChange={handleChange}
        submitted={submitted}
      />
    ));
  }
  return (
    <div className="question-container">
      <p className="question">{question.question}</p>
      <div className="options">{options()}</div>
      <hr />
    </div>
  );
}
