import React from "react";

/**
 * PUBLIC_INTERFACE
 * Square component: a clickable square on the tic tac toe grid.
 *
 * Props:
 * - value: "X" | "O" | null
 * - onClick: function to call on click
 */
function Square({ value, onClick }) {
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      aria-label={value ? `Cell contains ${value}` : "Empty board cell"}
    >
      {value}
    </button>
  );
}

export default Square;
