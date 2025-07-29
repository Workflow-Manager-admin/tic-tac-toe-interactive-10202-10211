import React from "react";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board component: displays the 3x3 tic tac toe grid, clickable squares.
 *
 * Props:
 * - squares: array (size 9) of {value: "X"|"O"|null, isWinner: boolean}
 * - onSquareClick: function(index) to handle square click
 *
 * Pastel board + class for winning squares, cotton-candy themed.
 */
function Board({ squares, onSquareClick }) {
  // Render 3 rows of 3 squares
  function renderSquare(i) {
    // Accept isWinner field optionally for coloring winner squares
    const valueProp = squares[i]?.value !== undefined ? squares[i].value : squares[i];
    const isWinner = squares[i]?.isWinner;
    return (
      <Square
        key={i}
        value={valueProp}
        onClick={() => onSquareClick(i)}
        isWinner={isWinner}
      />
    );
  }

  return (
    <div className="ttt-board" aria-label="tic tac toe board" role="grid">
      {[0, 1, 2].map((row) => (
        <div className="ttt-board-row" role="row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default Board;
