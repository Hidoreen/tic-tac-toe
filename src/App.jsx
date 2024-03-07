import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Game() {
  const [squares, setSquare] = useState(Array(9).fill(""));
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState('');

  function getWinner(squares) {
    const winningGroup = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winningGroup.length; i++) {
      const [a, b, c] = winningGroup[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(currentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[currentSquare]) return;
    cpySquares[currentSquare] = isX ? "X" : "O";
    setIsX(!isX);
    setSquare(cpySquares);
  }

  function handleRestart() {
    setSquare(Array(9).fill(''))
  }

  useEffect(() => {
    if (!getWinner(squares) && squares.every((square) => square !== "")) {
      setStatus(`This is a Draw, Take another try`)
    } else if(getWinner(squares)){
      setStatus(`Winner is ${getWinner(squares)}`)
    } else {
      setStatus(`Next player is ${isX? 'X' : 'O'}`)
    }
  }, [squares, isX]);

  return (
    <div className="wrapper">
      <h1>Play Tic-tac-toe?</h1>
      <div className="game">
        <div className="row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <h2>{status}</h2>
      <button onClick={handleRestart} className="restart">Restart</button>
    </div>
  );
}

export default Game;
