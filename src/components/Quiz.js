import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState({
    answered: false,
    submitted: false,
    data: [],
  });

  React.useEffect(() => {
    async function getQuiz() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      // console.log(data);
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        data: data.results.map((question) => ({
          question: question.question,
          correct: question.correct_answer,
          chosen: "",
          incorrect: question.incorrect_answers,
        })),
      }));
    }
    getQuiz();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    if (!quiz.submitted) {
      setQuiz((prevQuiz) => {
        const newQuiz = prevQuiz.data.map((question) => {
          return question.question === name
            ? { ...question, chosen: value }
            : question;
        });
        // console.log(newQuiz);
        const answered = !newQuiz.find((question) => question.chosen === "");

        return { ...prevQuiz, data: newQuiz, answered };
      });
    }
  }

  // console.log(quiz);

  function getQuestions() {
    return quiz.data.map((question) => (
      <Question
        question={question}
        submitted={quiz.submitted}
        key={nanoid()}
        handleChange={handleChange}
      />
    ));
  }

  function submitQuiz() {
    if (!quiz.answered) {
      alert("Please answer all the questions");
    } else {
      alert("Submitted!");
      setQuiz((prevQuiz) => ({ ...prevQuiz, submitted: true }));
    }
  }

  function Score() {
    let count = 0;
    quiz.data.forEach((question) => {
      if (question.chosen === question.correct) {
        count++;
      }
    });
    return <p>You scored {count}/5</p>;
  }

  return (
    <div className="quiz">
      <div className="quiz-questions">{getQuestions()}</div>
      <div className="quiz-submit">
        {quiz.submitted && <Score />}
        <button className="check-button" onClick={submitQuiz}>
          {quiz.submitted ? "Try Again" : "Check answers"}
        </button>
      </div>
    </div>
  );
}
