import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import StatusBar from './components/StatusBar';
import ControlBar from './components/ControlBar';

/*
PUBLIC_INTERFACE
App component: Top-level tic tac toe game app, handles game logic, theming, and mounting the cotton candy styled UI.
- Features:
  * Tic tac toe play, win/draw detection
  * Themed Board, Status bar, Control bar
  * Theme toggle (soft pastel/dark dreamy)
*/
function App() {
  const [theme, setTheme] = useState('light');
  // Board: { value: "X"/"O"/null, isWinner: bool }
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true = X's turn
  const [status, setStatus] = useState('playing'); // "playing" | "won" | "draw"
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Calculate winner and update state
  useEffect(() => {
    const result = calculateWinner(squares.map((sq) => (sq && sq.value !== undefined ? sq.value : sq)));
    if (result && result.winner) {
      setStatus('won');
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (squares.every((sq) => (sq && sq.value !== undefined ? sq.value : sq) != null)) {
      setStatus('draw');
      setWinner(null);
      setWinningLine([]);
    } else {
      setStatus('playing');
      setWinner(null);
      setWinningLine([]);
    }
  }, [squares]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // When a square is clicked
  const handleSquareClick = (idx) => {
    if (status !== 'playing') return;
    // Prepare using {value, isWinner} shape for each square
    let board = squares.map((sq) => {
      if (sq && typeof sq === "object" && "value" in sq) return { ...sq };
      return { value: sq, isWinner: false };
    });
    if (board[idx].value) return;
    board[idx].value = xIsNext ? 'X' : 'O';
    setSquares(board);
    setXIsNext((prev) => !prev);
  };

  // Restart game
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('playing');
    setWinner(null);
    setWinningLine([]);
  };

  // Compose squares with winner highlights
  const squaresWithHighlight = squares.map((sq, idx) => {
    const v = sq && sq.value !== undefined ? sq.value : sq;
    return {
      value: v,
      isWinner: winningLine.includes(idx),
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 style={{margin: "0 0 10px 0", fontWeight: 700, letterSpacing: "0.01em"}}>Tic Tac Toe 🍬</h1>
        <StatusBar xIsNext={xIsNext} status={status} winner={winner} />
        <Board squares={squaresWithHighlight} onSquareClick={handleSquareClick} />
        <ControlBar onRestart={handleRestart} />
        <div style={{marginTop: "22px", color: "var(--text-secondary)", fontSize: "15px"}} aria-label="cotton-candy-footer">
          <span role="img" aria-label="cotton candy">🍭</span> Theme: Soft Cotton Candy &nbsp;|&nbsp; <span style={{opacity:0.8}}>React</span>
        </div>
      </header>
    </div>
  );
}

// Calculates winner, returns { winner: "X"|"O", line: [indices] } or null
function calculateWinner(sqArray) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (sqArray[a] && sqArray[a] === sqArray[b] && sqArray[a] === sqArray[c]) {
      return { winner: sqArray[a], line };
    }
  }
  return null;
}

export default App;
