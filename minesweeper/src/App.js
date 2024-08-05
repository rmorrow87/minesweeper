import './App.css';
import React, { useState } from 'react';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <h1>Really Bad Minesweeper</h1>
      <Board />
    </div>
  );
}

export default App;
