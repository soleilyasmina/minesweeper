import React, { useEffect, useState } from 'react';
import { generateBoard, getNeighbors } from '../services/board';
import Box from './Box';

const Grid = (props) => {
  // eslint-disable-next-line
  const [size, setSize] = useState(10);
  const [board, setBoard] = useState(generateBoard(size));
  const [win, setWin] = useState(false);

  useEffect(() => {
    const { revealed, bombs } = board.flat(1).reduce((acc, curr) => {
      if (curr.isRevealed) acc.revealed += 1;
      if (curr.isBomb) acc.bombs += 1;
      return acc;
    }, { revealed: 0, bombs: 0 });

    console.log(revealed);

    if (size**2 - bombs === revealed) setWin(true);
  }, [board]);

  const revealBox = (y, x) => {
    const newBoard = board;
    newBoard[y][x].isRevealed = true;
    setBoard([...newBoard]);
  }

  const revealNeighbors = (currentY, currentX) => {
    if (board[currentY][currentX].isBomb) {
      setBoard((prevBoard) => prevBoard.map((row) => row.map((box) => {
        return box.isBomb ? {
          ...box,
          isRevealed: true
        } :
          box;
      })));
      return;
    }
    revealBox(currentY, currentX);
    const neighbors = getNeighbors(currentY, currentX, board.length);
    if (!board[currentY][currentX].neighboringBombs) {
      neighbors.forEach(({ y, x }) => {
        if (board[y][x].isRevealed || board[y][x].isBomb) {
        } else {
          revealNeighbors(y, x);
        }
      });
    }
  }

  return (
    <>
      <div className={`board-${size}`}>
        { board.flat(1).map((box) => (
          <Box
            box={box}
            revealNeighbors={revealNeighbors}
          />
        )) }
      </div>
      <h4>{win ? 'You win!' : 'Keep going!'}</h4>
    </>
  )
}

export default Grid;
