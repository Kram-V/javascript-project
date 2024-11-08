import React from "react";

const Button = ({ dispatch, children }) => {
  return (
    <button className="btn btn-ui" onClick={dispatch}>
      {children}
    </button>
  );
};

export default Button;
