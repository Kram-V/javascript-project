import React from "react";
import Button from "./Button";
import { useQuestionsContext } from "../contexts/QuestionsContext";

const FinishScreen = ({ points, maxPoints, highScore }) => {
  const { dispatch } = useQuestionsContext();

  const percentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore: {highScore} points</p>
      <Button dispatch={() => dispatch({ type: "restartQuiz" })}>
        Restart Quiz
      </Button>
    </>
  );
};

export default FinishScreen;
