import React from "react";
import Options from "./Options";
import { useQuestionsContext } from "../contexts/QuestionsContext";

const Question = ({ currentQuestion, answer }) => {
  const { dispatch } = useQuestionsContext();
  return (
    <div>
      <h4>{currentQuestion.question}</h4>

      <Options
        options={currentQuestion.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={currentQuestion.correctOption}
      />
    </div>
  );
};

export default Question;
