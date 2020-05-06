export function calculateWinner(squares) {
  const boardSize = squares.length;
  const rowSize = Math.sqrt(boardSize);

  let win = false;
  let winData = [];

  //check rows

  for (let i = 0; i < rowSize; i++) {
    const rowStart = rowSize * i;
    let winSequence = [];
    // check all rows for winner

    for (let k = rowStart; k < rowSize * (i + 1) - 1; k++) {
      if (squares[k] === squares[k + 1] && squares[k] != null) {
        win = true;
        if (winSequence.indexOf(k) === -1) {
          winSequence.push(k);
        }
        winSequence.push(k + 1);
      } else {
        win = false;
        break;
      }
    }
    if (win) {
      winData.push(squares[rowStart]);
      winData.push(winSequence);
      return winData;
    }
    //columns
    let j = 0;
    winSequence = [];
    while (i + j + rowSize < boardSize) {
      if (
        squares[i + j] === squares[i + j + rowSize] &&
        squares[i + j] != null
      ) {
        winSequence.push(i + j);
        winSequence.push(i + j + rowSize);
        win = true;
      } else {
        win = false;
        break;
      }
      j = j + rowSize;
    }
    if (win) {
      winData.push(squares[i + j - rowSize]);
      winData.push(winSequence);

      return winData;
    }
  }
  return null;
}
