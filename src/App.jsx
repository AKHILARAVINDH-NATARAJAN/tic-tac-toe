import React, { useState, useMemo } from "react";
import Board from "./components/Board";

const initialCells = Array(9).fill(null);

export default function App() {
  const [cells, setCells] = useState(initialCells);
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);

  const winnerInfo = useMemo(() => calculateWinner(cells), [cells]);
  const winner = winnerInfo?.winner;

  const handleClick = (idx) => {
    if (cells[idx] || winner) return;
    const newCells = [...cells];
    newCells[idx] = xIsNext ? "X" : "O";
    setCells(newCells);
    setHistory((h) => [...h, { idx, player: newCells[idx] }]);
    setXIsNext((s) => !s);
  };

  const reset = () => {
    setCells(initialCells);
    setXIsNext(true);
    setHistory([]);
  };

  const undo = () => {
    if (!history.length || winner) return;
    const h = [...history];
    const last = h.pop();
    const newCells = [...cells];
    newCells[last.idx] = null;
    setCells(newCells);
    setHistory(h);
    setXIsNext(last.player === "X" ? false : true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : history.length === 9
    ? "It's a draw"
    : `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="app-shell">
      <header className="header">
        <h1>Tic ✕ O</h1>
        <p className="sub">A polished Tic Tac Toe game </p>
      </header>

      <main className="panel">
        <div className="left">
          <Board cells={cells} onClick={handleClick} winningLine={winnerInfo?.line} />
        </div>

        <aside className="right">
          <div className="status">{status}</div>

          <div className="controls">
            <button className="btn" onClick={reset}>
              Restart
            </button>
            <button
              className="btn secondary"
              onClick={undo}
              disabled={!history.length}
            >
              Undo
            </button>
          </div>

          <div className="history">
            <h3>Moves</h3>
            <ol>
              {history.map((m, i) => (
                <li key={i}>
                  Move {i + 1}: {m.player} → Row {Math.floor(m.idx / 3) + 1}, Col{" "}
                  {(m.idx % 3) + 1}
                </li>
              ))}
            </ol>
          </div>

          
        </aside>
      </main>

      
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line };
    }
  }
  return null;
}
