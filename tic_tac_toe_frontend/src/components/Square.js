import React from "react";

/**
 * PUBLIC_INTERFACE
 * Square component: a clickable square on the tic tac toe grid.
 *
 * Props:
 * - value: "X" | "O" | null
 * - onClick: function to call on click
 * - isWinner: boolean (highlight if part of winning line)
 *
 * Style: Soft rounded pastel cotton candy tile.
 */
function Square({ value, onClick, isWinner }) {
  return (
    <button
      className={`ttt-square${isWinner ? " square-winner" : ""}`}
      onClick={onClick}
      aria-label={value ? `Cell contains ${value}` : "Empty board cell"}
      role="gridcell"
      tabIndex={0}
    >
      {value}
    </button>
  );
}

export default Square;
