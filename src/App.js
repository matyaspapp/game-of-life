import React, { useState } from 'react';
import './App.css';

const NUM_ROWS = 30;
const NUM_COLS = 30;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let rowIdx = 0; rowIdx < NUM_ROWS; rowIdx++) {
      rows.push(Array(NUM_COLS).fill(0));
    }
    return rows;
  });

  return (
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
            style={{
              width: 18,
              height: 18,
              backgroundColor: grid[i][j] ? "magenta" : "black",
              border: "solid 1px white"
            }}
          />)  
      )}
    </div>
  );
}

export default App;
