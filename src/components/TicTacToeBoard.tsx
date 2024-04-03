import React from 'react';
import './TicTacToeBoard.css';

type BoardProps = {
  board: string[][];
  onSelect: (row: number, col: number) => void;
};

const TicTacToeBoard: React.FC<BoardProps> = ({ board, onSelect }) => {
  return (
    <div className="board-container">
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((value, j) => (
            <button
              key={j}
              onClick={() => onSelect(i, j)}
              className="board-cell"
              disabled={value !== ''}
            >
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicTacToeBoard;
