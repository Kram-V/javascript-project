import React from "react";
import OptionItem from "./OptionItem";

const Options = ({ options, dispatch, answer, correctOption }) => {
  return (
    <div className="options">
      {options.map((option, i) => (
        <OptionItem
          key={option}
          option={option}
          dispatch={dispatch}
          i={i}
          answer={answer}
          correctOption={correctOption}
        />
      ))}
    </div>
  );
};

export default Options;
