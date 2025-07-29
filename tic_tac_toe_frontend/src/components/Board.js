import React from "react";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board component: displays the 3x3 tic tac toe grid, clickable squares.
 *
 * Props:
 * - squares: array (size 9) of "X", "O", or null
 * - onSquareClick: function(index) to handle square click
 */
function Board({ squares, onSquareClick }) {
  // Render 3 rows of 3 squares
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
      />
    );
  }

  return (
    <div className="ttt-board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-board-row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default Board;
