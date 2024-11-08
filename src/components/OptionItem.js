import React from "react";

const OptionItem = ({ option, dispatch, i, answer, correctOption }) => {
  return (
    <button
      className={`btn btn-option ${answer === i ? "answer" : ""} ${
        answer !== null ? (correctOption === i ? "correct" : "wrong") : ""
      }`}
      disabled={answer !== null}
      onClick={() => dispatch({ type: "answer", payload: i })}
    >
      {option}
    </button>
  );
};

export default OptionItem;
