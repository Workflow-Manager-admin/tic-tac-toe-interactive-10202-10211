import React from "react";

/**
 * PUBLIC_INTERFACE
 * StatusBar component: displays current game status & instructions.
 *
 * Props:
 * - xIsNext: bool; true if next turn is X
 * - status: "playing" | "won" | "draw"
 * - winner: "X" | "O" | null
 */
function StatusBar({ xIsNext, status, winner }) {
  let message = "";
  if (status === "won") {
    message = `Winner: ${winner}`;
  } else if (status === "draw") {
    message = "The game is a draw!";
  } else {
    message = `Next Turn: ${xIsNext ? "X" : "O"}`;
  }
  return <div className={`ttt-status ${status}`}>{message}</div>;
}

export default StatusBar;
