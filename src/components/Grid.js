import React, { useEffect, useState } from 'react';
import { generateBoard, getNeighborsToReveal } from '../services/board';
import Box from './Box';

const Grid = (props) => {
  const [board, setBoard] = useState(generateBoard(10));

  const revealBox = (y, x) => {
    const newBoard = board;
    newBoard[y][x].isRevealed = true;
    setBoard([...newBoard]);
    console.log(newBoard);
  }

  const revealNeighbors = (currentY, currentX) => {
    if (board[currentY][currentX].isBomb) {
      setBoard((prevBoard) => prevBoard.map((row) => row.map((box) => {
        return {
          ...box,
          isRevealed: true
        }
      })));
      return;
    }
    revealBox(currentY, currentX);
    const neighbors = getNeighborsToReveal(currentY, currentX, board.length);
    if (!board[currentY][currentX].neighboringBombs) {
      neighbors.forEach(({ y, x }) => {
        if (board[y][x].isRevealed || board[y][x].isBomb) {
          console.log('whatever');
        } else {
          revealNeighbors(y, x);
        }
      });
    }
  }

  return (
    <>
      <div className="board-10">
        { board.flat(1).map((box) => (
          <Box
            box={box}
            revealNeighbors={revealNeighbors}
          />
        )) }
      </div>
    </>
  )
}

export default Grid;
