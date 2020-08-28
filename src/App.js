import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

const NUM_ROWS = 30;
const NUM_COLS = 30;
const OPERATIONS = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
const initialGrid = () => {
  const rows = [];
    for (let rowIdx = 0; rowIdx < NUM_ROWS; rowIdx++) {
      rows.push(Array(NUM_COLS).fill(0));
    }
    return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return initialGrid();
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  console.log(running);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // simulate
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < NUM_ROWS; i++) {
          for (let j = 0; j < NUM_COLS; j++) {
            let neighbours = 0;
            OPERATIONS.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (
                0 <= newI && newI < NUM_ROWS
                && 0 <= newJ && newJ < NUM_COLS
              ) {
                neighbours += g[newI][newJ];
              }
            });

            if (neighbours < 2 || 3 < neighbours) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbours === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100)
  }, []); // [] -> the function only created once

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setGrid(initialGrid());
        }}
      >
        Clear
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`
        }}
      >
        {grid.map((rows, i) => 
          rows.map((col, j) =>
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][j] = +!grid[i][j];
                });
                setGrid(newGrid);
              }}
              style={{
                width: 18,
                height: 18,
                backgroundColor: grid[i][j] ? "magenta" : "black",
                border: "solid 1px white"
              }}
            />)  
        )}
      </div>
    </>
  );
}

export default App;
