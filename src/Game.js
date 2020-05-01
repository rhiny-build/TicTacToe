import React from "react";
import { Board } from "./Board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const nextSquares = history[history.length - 1].squares.slice();
    nextSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: nextSquares
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1
    });
  }
  render() {
    //alert("rendering "  + this.state.stepNumber + ',' + this.state.xIsNext);
    const history = this.state.history;
    const current = history[this.state.stepNumber]; //current state of board
    //console.log(current);
    let status = "Next player:" + (this.state.xIsNext ? "X" : "O");
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = "Winner is " + winner;
    }
    // step --> step is the state of the board at move. We don't need it here, just move is important.
    const moves = history.map((step, move) => {
      const desc = move ? "Go to Step #" + move : "Go to Game Start ";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board board={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(i) {
    this.setState({
      stepNumber: i,
      xIsNext: i % 2 === 0
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}