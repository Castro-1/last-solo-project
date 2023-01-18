import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([]);

  React.useEffect(() => {
    async function getQuiz() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      setQuiz(
        data.results.map((question) => ({
          question: question.question,
          correct: question.correct_answer,
          chosen: "",
          incorrect: question.incorrect_answers,
        }))
      );
    }
    getQuiz();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setQuiz((prevQuiz) => {
      return prevQuiz.map((question) => {
        return question.question === name
          ? { ...question, chosen: value }
          : question;
      });
    });
  }

  function getQuestions() {
    return quiz.map((question) => (
      <Question
        question={question}
        key={nanoid()}
        handleChange={handleChange}
      />
    ));
  }

  return (
    <div className="quiz">
      <div className="quiz-questions">{getQuestions()}</div>
      <button className="check-button">Check answers</button>
    </div>
  );
}
