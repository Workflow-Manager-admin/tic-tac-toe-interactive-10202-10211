import React from "react";

/**
 * PUBLIC_INTERFACE
 * ControlBar: contains restart button under the board.
 *
 * Props:
 * - onRestart: function to reset the game
 */
function ControlBar({ onRestart }) {
  return (
    <div className="ttt-controlbar">
      <button className="ttt-btn ttt-restart-btn" onClick={onRestart}>
        Restart Game
      </button>
    </div>
  );
}

export default ControlBar;
