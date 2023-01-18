import React from "react";

export default function Option(props) {
  const { value, name, question, handleChange } = props;
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
        <label
          className={question.chosen === value ? "option selected" : "option"}
          htmlFor={value}
        >
          {value}
        </label>
      </div>
    </div>
  );
}
