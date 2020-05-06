import React from "react";
import { Board } from "./Board";
import { calculateWinner } from "./calculateWinner";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(props.boardSize * props.boardSize).fill(null),
          location: -1
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      timeTravel: false
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const nextSquares = history[history.length - 1].squares.slice();
    if (nextSquares[i] != null) {
      return;
    }
    nextSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: nextSquares,
          location: i
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
      timeTravel: false
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; //current state of board
    let status = "Next player:" + (this.state.xIsNext ? "X" : "O");
    const winner = calculateWinner(current.squares);
    let highlight = [];
    if (winner != null) {
      console.log(winner);
      status = "Winner is " + winner[0];
      highlight = winner[1].slice();
    }
    const moves = history.map((step, move) => {
      const location = history[move].location;
      const row = location < 3 ? "3" : location < 6 ? "2" : "1";
      const col = location % 3 === 0 ? "A" : location % 3 === 1 ? "B" : "C";
      const desc = move
        ? "Go to Step #" + move + " (" + col + row + ")"
        : "Go to Game Start ";
      const buttonStyle =
        this.state.timeTravel && move === this.state.stepNumber
          ? "step-clicked"
          : "step-unclicked";
      return (
        <li key={move}>
          <button className={buttonStyle} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            board={current.squares}
            highlight={highlight}
            onClick={i => this.handleClick(i)}
          />
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
      xIsNext: i % 2 === 0,
      timeTravel: true
    });
  }
}
