import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState({
    answered: false,
    submitted: false,
    data: [],
  });
  const [highestScore, setHighestScore] = React.useState({
    play: false,
    score: 0,
  });

  React.useEffect(() => {
    async function getQuiz() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      // console.log(data);
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        answered: false,
        submitted: false,
        data: data.results.map((question) => ({
          question: question.question
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'"),
          correct: question.correct_answer
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'"),
          chosen: "",
          incorrect: question.incorrect_answers,
        })),
      }));
    }
    // console.log("yessir");
    getQuiz();
  }, [highestScore]);

  console.log(quiz);

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
    if (quiz.submitted) {
      setHighestScore((prevScore) => {
        const score = Score();
        return {
          score: prevScore.score > score ? prevScore : score,
          play: !prevScore.play,
        };
      });
    }
    if (!quiz.answered) {
      alert("Please answer all the questions");
    } else {
      // alert("Submitted!");
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
    return count;
  }

  return (
    <div className="quiz">
      {Score() === 5 && quiz.submitted && <ReactConfetti recycle={false} />}
      <div className="quiz-questions">{getQuestions()}</div>
      <div className="quiz-submit">
        {quiz.submitted && (
          <p className="question">You scored {Score()}/5 correct answers</p>
        )}
        <button className="check-button" onClick={submitQuiz}>
          {quiz.submitted ? "Play again" : "Check answers"}
        </button>
      </div>
    </div>
  );
}
