import React from "react";

const ProgressBar = ({ index, totalQuestions, points, maxPoints, answer }) => {
  return (
    <div className="progress">
      <progress max={totalQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {totalQuestions}
      </p>

      <p>
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </div>
  );
};

export default ProgressBar;
