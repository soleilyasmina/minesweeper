import React, { useEffect, useState } from 'react';
import { generateBoard, getNeighbors } from '../services/board';
import Box from './Box.jsx';

const Grid = () => {
  // eslint-disable-next-line
  const [size, setSize] = useState(10);
  const [board, setBoard] = useState(generateBoard(size));
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  useEffect(() => {
    const { bombs, flagged, revealed } = board.flat(1).reduce((acc, curr) => {
      if (curr.isBomb) acc.bombs += 1;
      if (curr.isFlagged) acc.flagged += 1;
      if (curr.isRevealed) acc.revealed += 1;
      return acc;
    }, { bombs: 0, flagged: 0, revealed: 0 });
    if (size ** 2 - bombs === revealed + flagged) setWin(true);
  }, [board, size]);

  const revealBox = (y, x) => {
    const newBoard = board;
    if (newBoard[y][x].isRevealed || newBoard[y][x].isFlagged) return;
    newBoard[y][x].isRevealed = true;
    setBoard([...newBoard]);
  };

  const flagBox = (e, y, x) => {
    e.preventDefault();
    const newBoard = board;
    if (newBoard[y][x].isRevealed) return;
    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;
    setBoard([...newBoard]);
  };

  const revealNeighbors = (currentY, currentX) => {
    if (board[currentY][currentX].isBomb) {
      setBoard((prevBoard) => prevBoard.map((row) => row.map((box) => ({
        ...box,
        isRevealed: true,
      }))));
      setLose(true);
      return;
    }
    revealBox(currentY, currentX);
    const neighbors = getNeighbors(currentY, currentX, board.length);
    if (!board[currentY][currentX].neighboringBombs) {
      neighbors.forEach(({ y, x }) => {
        if (!board[y][x].isRevealed && !board[y][x].isBomb) {
          revealNeighbors(y, x);
        }
      });
    }
  };

  const message = () => {
    if (win) {
      return 'You win!';
    }
    if (lose) {
      return 'You lose!';
    }
    return `Keep going, there are ${size} bombs left.`;
  };

  return (
    <>
      <div className={`board-${size}`}>
        { board.flat(1).map((box) => (
          <Box
            box={box}
            flagBox={flagBox}
            revealNeighbors={revealNeighbors}
          />
        )) }
      </div>
      <h4>{message()}</h4>
    </>
  );
};

export default Grid;
