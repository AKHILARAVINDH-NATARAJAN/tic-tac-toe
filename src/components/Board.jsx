import React from "react";

export default function Board({ cells, onClick, winningLine = [] }) {
  return (
    <div className="board" role="grid" aria-label="Tic tac toe board">
      {cells.map((cell, idx) => {
        const isWinning = winningLine && winningLine.includes(idx);
        return (
          <button
            key={idx}
            className={`cell ${cell ? "filled" : ""} ${isWinning ? "win" : ""}`}
            onClick={() => onClick(idx)}
            aria-label={`Cell ${idx + 1} ${
              cell ? "occupied by " + cell : "empty"
            }`}
          >
            <span className="mark">{cell}</span>
          </button>
        );
      })}
    </div>
  );
}
