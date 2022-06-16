import React from "react";

function Cell({ children, ...props }) {
  return (
    <div className="cell" {...props}>
      {children}
    </div>
  );
}

export default Cell;
