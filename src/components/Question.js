import React from "react";
import Option from "./Option";

export default function Question(props) {
  const { question, handleChange } = props;

  function options() {
    const options = [question.correct];
    question.incorrect.forEach((answer) => options.push(answer));
    options.sort().reverse();

    return options.map((option) => (
      <Option
        key={option}
        value={option}
        name={question.question}
        question={question}
        handleChange={handleChange}
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
