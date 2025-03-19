export function Grid({ rows = 15, cols = 10 }) {
  const gridElements = [];

  for (let row = 0; row < rows; row++) {
    const cellElements = [];
    for (let col = 0; col < cols; col++) {
      cellElements.push(<view key={`cell-${row}-${col}`} className="cell" />);
    }
    gridElements.push(
      <view key={`row-${row}`} className="row">
        {cellElements}
      </view>,
    );
  }

  return <view className="GameGrid">{gridElements}</view>;
}
