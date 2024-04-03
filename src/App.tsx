import { useState } from 'react'
import './App.css'
import TicTacToeBoard from './components/TicTacToeBoard';

function App() {
  const generateBoard = (size: number) => {
    return new Array(size).fill(new Array(size).fill(''))
  }

  const [board, setBoard] = useState(generateBoard(3));
  console.log(board)
  const [isNext, setIsNext] = useState(true);
  const [winnnerStatus, setStatus] = useState<Boolean | string>(false);
  const [moveBy, setMoveBy] = useState('X');
  const calculateWinner = (board: any[]):Boolean | string => {
    const m = board.length;
    const combinations = []
    for (let i = 0; i < m; i++) {
      combinations.push(board[i]); // Horizontal
      combinations.push(board.map(row => row[i])); // Vertical
    }

    // Diagonal combinations
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < m; i++) {
      diagonal1.push(board[i][i]);
      diagonal2.push(board[i][m - 1 - i]);
    }
    combinations.push(diagonal1, diagonal2);
    return combinations.some(combination => combination.every((a: any) => a && a === combination[0])) && "winner";
  }

  const onSelect = (i: number, j: number) => {
    let newBoard = [...board]
    newBoard[i] = [...newBoard[i]]; // Make a shallow copy of the row
    newBoard[i][j] = isNext ? 'X' : 'O';
    setMoveBy(newBoard[i][j]);
    setIsNext(!isNext);
    setBoard(newBoard);
    setStatus(calculateWinner(newBoard))
  }

  return (
    <>
      <div>
      <h1>Tic Tac Toe</h1>
      <TicTacToeBoard board={board} onSelect={onSelect} />
      {winnnerStatus && <div>{moveBy}, You're a winner</div>}
    </div>
       
    </>
  )
}

export default App
