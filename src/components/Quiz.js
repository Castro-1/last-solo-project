import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([]);

  React.useEffect(() => {
    async function getQuiz() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      setQuiz(data.results);
    }
    getQuiz();
  }, []);

  function getQuestions() {
    return quiz.map((question) => (
      <Question question={question} key={nanoid()} />
    ));
  }

  return (
    <div className="quiz">
      <div class="quiz-questions">{getQuestions()}</div>
      <button className="check-button">Check answers</button>
    </div>
  );
}
