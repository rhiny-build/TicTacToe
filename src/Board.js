import React from "react";
import { Square } from "./Square";

export class Board extends React.Component {
  renderSquare(i) {
    let win = this.props.highlight.includes(i) ? true : false;
    return (
      <Square
        shouldHighlight={win}
        value={this.props.board[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status" />
        {this.createBoard(Math.sqrt(this.props.board.length))}
      </div>
    );
  }
  createBoard(size) {
    let board = [];
    for (let rowNum = 0; rowNum < size; rowNum++) {
      let rowDiv = [];
      let row = [];
      //row.push(<div className="board-row">);
      row.push(<h2 className="row-title">{size - rowNum}</h2>);
      for (let col = 0; col < size; col++) {
        const index = size * rowNum + col;
        //console.log('index : ' + index);
        row.push(this.renderSquare(index));
      }
      rowDiv.push(<div className="board-row">{row}</div>);
      board.push(rowDiv);
    }
    // column titles
    let titles = (
      <div className="board-row">
        <h2 className="square-title">A</h2>
        <h2 className="square-title">B</h2>
        <h2 className="square-title">C</h2>
      </div>
    );

    board.push(titles);
    return board;
  }
}
