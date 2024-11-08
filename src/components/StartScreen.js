import React from "react";
import { useQuestionsContext } from "../contexts/QuestionsContext";

const StartScreen = ({ totalQuestions }) => {
  const { dispatch } = useQuestionsContext();

  return (
    <div className="start">
      <h2>Welcome to the Javascript Quiz</h2>
      <h3>{totalQuestions} question to test your JS Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
