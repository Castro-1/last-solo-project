import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

export default function App() {
  const [started, setStarted] = React.useState(false);
  function startQuiz() {
    setStarted(true);
  }
  return (
    <div className="main-container">
      {started === false && <Start startQuiz={startQuiz} />}
      {started === true && <Quiz />}
    </div>
  );
}
