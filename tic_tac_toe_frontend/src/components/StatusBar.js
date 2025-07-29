import React from "react";

/**
 * PUBLIC_INTERFACE
 * StatusBar component: displays current game status & instructions.
 *
 * Props:
 * - xIsNext: bool; true if next turn is X
 * - status: "playing" | "won" | "draw"
 * - winner: "X" | "O" | null
 *
 * Style: Fluffy pastel bar, status-dependent coloring.
 */
function StatusBar({ xIsNext, status, winner }) {
  let message = "";
  if (status === "won") {
    message = `Winner: ${winner} 🎉`;
  } else if (status === "draw") {
    message = "It's a draw! 🍬";
  } else {
    message = `Next Turn: ${xIsNext ? "X" : "O"}`;
  }
  return (
    <div
      className={`ttt-status${status ? " " + status : ""}`}
      aria-live="polite"
      role="status"
    >
      {message}
    </div>
  );
}

export default StatusBar;
