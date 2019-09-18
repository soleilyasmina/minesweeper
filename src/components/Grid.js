import React, { useState } from 'react';
import { generateBoard } from '../services/board';

const Grid = (props) => {
  const [board, setBoard] = useState(generateBoard(8));

  return (
    <div className="board">
      { board.flat(1).map((box) => {
        return <div className="box">{box.isBomb ? 'B' : box.neighboringBombs}</div>
      }) }
    </div>
  )
}

export default Grid;
