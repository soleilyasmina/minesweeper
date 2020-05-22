import React from 'react';

const Box = ({ box: { isBomb, isFlagged, isRevealed, neighboringBombs, x, y }, flagBox, revealNeighbors }) => {
  let emoji;
  if (isRevealed && isBomb) {
    emoji = '💣';
  } else if (isRevealed && neighboringBombs > 0) {
    emoji = neighboringBombs;
  } else if (isRevealed) {
    emoji = '';
  } else if (isFlagged) {
    emoji = '🚩';
  } else {
    emoji = 'X';
  }
  return (
    <div
      onClick={() => revealNeighbors(y, x)}
      onContextMenu={(e) => flagBox(e, y, x)}
      className="box">
      {emoji}
    </div>
  )
}

export default Box;
