import React from "react";
import Start from "./components/Start";

export default function App() {
  const [started, setStarted] = React.useState(false);
  return (
    <div className="main-container">
      {started === false && <Start setStarted={setStarted} />}
    </div>
  );
}
