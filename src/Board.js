import React from "react";
import { Square } from "./Square";

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.board[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status" />
        <div className="board-row">
          <h2 className="row-title">3</h2>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          <h2 className="row-title">2</h2>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <h2 className="row-title">1</h2>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          <h2 className="square-title">A</h2>
          <h2 className="square-title">B</h2>
          <h2 className="square-title">C</h2>
        </div>
      </div>
    );
  }
}
