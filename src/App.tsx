import { useEffect, useState } from 'react'
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
  const [isDisabled, setDisabled] = useState(false);
  const [inputSize, setInputSize] = useState(3)
  const handleInputChange = (value:number) =>{
    value = value >= 3 && value <= 10 ? value : 3;
    setInputSize(value);    
  }
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
    let newBoard = [...board];
    let winner; 
    newBoard[i] = [...newBoard[i]]; // Make a shallow copy of the row
    newBoard[i][j] = isNext ? 'X' : 'O';
    setIsNext(!isNext);
    setBoard(newBoard);
    winner = calculateWinner(newBoard);
    if(winner)
    {
      setMoveBy(newBoard[i][j]);
      setStatus(true);
      setDisabled(true);
    }
  }

  const handleRefresh = ()=> {
    setBoard(generateBoard(inputSize));
    setDisabled(false);
    setStatus(false);
  }

  useEffect(()=>{
    setBoard(generateBoard(inputSize))
  },[inputSize])

  return (
    <>
      <div className='parent-container'>
      <h1>Tic Tac Toe</h1>
      <form>
        <label>Input Size:</label>
        <input  style={{marginLeft:'10px'}} value={inputSize} type='number' onChange={e=>handleInputChange(e.target.valueAsNumber)} ></input>
      </form>
      <TicTacToeBoard disabled={isDisabled} board={board} onSelect={onSelect} />
      {winnnerStatus && (<><div>{moveBy}, You're a winner</div>
      <button onClick={handleRefresh}>Refresh</button></>)}
    </div>
       
    </>
  )
}

export default App
