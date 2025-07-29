import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import StatusBar from "./components/StatusBar";
import ControlBar from "./components/ControlBar";

/**
 * PUBLIC_INTERFACE
 * Main App component for the Tic Tac Toe game.
 * Handles theme management and overall layout.
 */
function App() {
  // Theme - could be expanded later. Keeping theme toggle visible for code extensibility.
  const [theme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Game state management
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'draw'
  const [winner, setWinner] = useState(null);

  // Reset game to initial state
  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus("playing");
    setWinner(null);
  };

  // Handle square click for gameplay
  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // No-op if game is over or cell filled
    if (squares[index] || gameStatus !== "playing") return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    const winResult = calculateWinner(nextSquares);
    if (winResult) {
      setGameStatus("won");
      setWinner(winResult);
    } else if (nextSquares.every((sq) => sq)) {
      setGameStatus("draw");
      setWinner(null);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  // PUBLIC_INTERFACE
  function calculateWinner(cells) {
    // All possible win lines
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let [a, b, c] of lines) {
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return cells[a]; // 'X' or 'O'
      }
    }
    return null;
  }

  return (
    <div className="App">
      <div className="ttt-wrapper">
        {/* Game Title */}
        <h1 className="ttt-title">Tic Tac Toe</h1>
        {/* Status Bar */}
        <StatusBar
          xIsNext={xIsNext}
          status={gameStatus}
          winner={winner}
        />
        {/* Game Board */}
        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          highlight={gameStatus === "won" ? winner : null}
        />
        {/* Control Bar: restart */}
        <ControlBar onRestart={handleRestart} />
      </div>
      <footer className="ttt-footer">
        <span>Classic Game &copy; KAVIA</span>
      </footer>
    </div>
  );
}

export default App;
