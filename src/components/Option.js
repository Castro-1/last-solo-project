import React from "react";

export default function Option(props) {
  const { value, name, question, handleChange, submitted } = props;
  function optionClasses() {
    let classes = "";
    if (submitted) {
      if (question.chosen === value && value !== question.correct) {
        classes = "option wrong";
      } else if (value === question.correct) {
        classes = "option correct";
      } else {
        classes = "option not-selected";
      }
    } else {
      classes = question.chosen === value ? "option selected" : "option";
    }
    return classes;
  }
  return (
    <div>
      <input
        id={value}
        type="radio"
        value={value}
        name={name}
        checked={question.chosen === value}
        onChange={handleChange}
        className="radio-input"
      />
      <div>
        <label className={optionClasses()} htmlFor={value}>
          {value}
        </label>
      </div>
    </div>
  );
}
