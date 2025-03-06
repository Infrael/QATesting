import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;
    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? "X" : "O";
    setBoard(updatedBoard);
    setIsXNext(!isXNext);
  }

  function renderSquare(index) {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  }

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {renderSquare(row * 3)}
            {renderSquare(row * 3 + 1)}
            {renderSquare(row * 3 + 2)}
          </div>
        ))}
      </div>
      <h2>
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>
      <button className="reset" onClick={() => setBoard(Array(9).fill(null))}>
        Reset
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default App;
