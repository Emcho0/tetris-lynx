export function Grid({
  rows = 15,
  cols = 10,
  grid,
  fallingTetromino,
  tetrominoPos,
  rotationIndex,
  theme,
}) {
  const displayGrid = grid.map((row) => [...row]);

  if (fallingTetromino && tetrominoPos) {
    const shape = fallingTetromino.rotations[rotationIndex];
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newRow = tetrominoPos.row + r;
          const newCol = tetrominoPos.col + c;

          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            displayGrid[newRow][newCol] = fallingTetromino.name;
          }
        }
      }
    }
  }

  const gridElements = [];
  for (let row = 0; row < rows; row++) {
    const cellElements = [];
    for (let col = 0; col < cols; col++) {
      const cellValue = displayGrid[row][col];
      let cellClass = "cell";

      if (cellValue !== 0) {
        cellClass += " " + "tetromino-" + cellValue;
        cellClass += " " + theme;
      }
      cellElements.push(
        <view key={`cell-${row}-${col}`} className={cellClass} />,
      );
    }
    gridElements.push(
      <view key={`row-${row}`} className="row">
        {cellElements}
      </view>,
    );
  }

  return <view className="GameGrid">{gridElements}</view>;
}
