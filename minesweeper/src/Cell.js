import React from 'react';
import './Cell.css';

const Cell = ({ cell, onClick }) => {
  return (
    <div
      className={`cell ${cell.isRevealed ? 'revealed' : ''}`}
      onClick={onClick}
    >
      {cell.isRevealed ? (cell.isMine ? '💣' : cell.adjacentMines || '') : ''}
    </div>
  )
}

export default Cell;