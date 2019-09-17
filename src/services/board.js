const generateBoard = (size) => {
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
  return board;
}

console.log(generateBoard(5));
