import React from 'react';

const Box = ({ box, revealNeighbors }) => (
  <div 
    onClick={() => revealNeighbors(box.y, box.x)}
    className="box">
    {box.isRevealed ? (box.isBomb ? 'B' : box.neighboringBombs ? box.neighboringBombs : '') : 'X'}
  </div>
)

export default Box;
