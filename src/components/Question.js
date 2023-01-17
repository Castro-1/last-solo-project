import React from "react";
import Option from "./Option";

export default function Question(props) {
  const { question } = props;
  function options() {
    const options = [question.correct_answer];
    question.incorrect_answers.forEach((answer) => options.push(answer));
    if (options.length > 2) options.sort();

    return options.map((option) => <Option key={option} value={option} />);
  }
  console.log(question);
  return (
    <div className="question-container">
      <p className="question">{question.question}</p>
      <div className="options">{options()}</div>
      <hr />
    </div>
  );
}
