import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

const createBoard = (rows, columns, mines = 10) => {
  let board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push({ isMine: false, isRevealed: false, adjacentMines: 0 })
    }
    board.push(row);
  }

  let placedMines = 0;
  while (placedMines < mines) {
    let randomRow = Math.floor(Math.random() * rows);
    let randomCol = Math.floor(Math.random() * columns);
    if (!board[randomRow][randomCol].isMine) {
      board[randomRow][randomCol].isMine = true;
      placedMines++;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!board[i][j].isMine) {
        let adjacentMines = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              i + x >= 0 &&
              i + x < rows &&
              j + y >= 0 &&
              j + y < columns &&
              board[i + x][j + y].isMine
            ) {
              adjacentMines++;
            }
          }
        }
        board[i][j].adjacentMines = adjacentMines;
      }
    }
  }

  return board;
}

const Board = () => {
  const [board, setBoard] = useState(createBoard(10, 10))
  const [revealedCells, setRevealedCells] = useState(0);

  const handleCellClick = (row,column) => {
    let newBoard = [...board];
    if (!newBoard[row][column].isRevealed && !newBoard[row][column].isFlagged) {
      if (newBoard[row][column].isMine) {
        alert('Game Over');
        // Optionally reveal all mines or reset the game
      } else {
        const newRevealedCells = revealCell(newBoard, row, column);
        setBoard(newBoard);
        setRevealedCells(revealedCells + newRevealedCells);
        checkWin(newBoard, revealedCells + newRevealedCells);
      }
    }
  };

  const revealCell = (board, row, column) => {
    if (row < 0 || row >= board.length || column < 0 || column >= board[0].length) return 0;
    if (board[row][column].isRevealed || board[row][column].isMine || board[row][column].isFlagged) return 0;

    board[row][column].isRevealed = true;
    let revealedCellsCount = 1;

    if (board[row][column].adjacentMines === 0) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          revealedCellsCount += revealCell(board, row + x, column + y);
        }
      }
    }

    return revealedCellsCount;
  };

  const checkWin = (board, revealedCells) => {
    const totalCells = board.length * board[0].length;
    const totalMines = board.flat().filter(cell => cell.isMine).length;
    if (revealedCells === totalCells - totalMines) {
      alert('You Win!');
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, columnIndex) => (
            <Cell
              key={columnIndex}
              cell={cell}
              onClick={() => handleCellClick(rowIndex, columnIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

export default Board;