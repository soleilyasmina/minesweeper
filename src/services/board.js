const provideBombs = (board) => {
  let currentBombs = 0;
  for (let i = 0; i < 10; i++) {
    while (currentBombs === i) {
      const y = Math.floor(Math.random() * board.length);
      const x = Math.floor(Math.random() * board.length);
      if (!board[y][x].isBomb) {
        board[y][x].isBomb = true;
        currentBombs += 1;
      }
    }
  }
  return board;
}

const isCoordinate = (y, x, size) => {
  return y >= 0 && x >= 0 && y < size && x < size;
}

const getNeighbors = (y, x, size) => {
  const neighbors = []; 
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (isCoordinate(y + j, x + i, size)) {
        neighbors.push({
          y: y + j,
          x: x + i
        });
      }
    }
  }
  return neighbors;
}

export const getNeighborsToReveal = (y, x, size) => {
  return getNeighbors(y, x, size).filter((box) => box.y === y || box.x === x);
}

const declareNeighboringBombs = (board) => {
  const bombs = board.flat(1).filter((box) => box.isBomb);
  bombs.forEach((bomb) => {
    const neighbors = getNeighbors(bomb.y, bomb.x, board.length);
    neighbors.forEach(({ y, x }) => {
      board[y][x].neighboringBombs += 1;
    });
  });
  return board;
}

export const generateBoard = (size) => {
  const board = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push({
        isBomb: false,
        isRevealed: false,
        neighboringBombs: 0,
        x, y
      });
    }
    board.push(row);
  }
  const boardWithBombs = provideBombs(board);
  const boardWithNeighboringBombs = declareNeighboringBombs(boardWithBombs);
  return boardWithNeighboringBombs;
}
