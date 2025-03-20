interface TetrominoProps {
  shape: number[][];
  colorClass: string;
}

export function Tetromino({ shape, colorClass }: TetrominoProps) {
  return (
    <view style={{ display: "flex", flexDirection: "column" }}>
      {shape.map((row, rowIndex) => (
        <view key={`row-${rowIndex}`} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) =>
            cell ? (
              <view
                key={`cell-${rowIndex}-${cellIndex}`}
                className={colorClass}
                style={{
                  width: "var(--cell-size)",
                  height: "var(--cell-size)",
                  border: "var(--cell-border)",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <view
                key={`cell-${rowIndex}-${cellIndex}`}
                style={{
                  width: "var(--cell-size)",
                  height: "var(--cell-size)",
                }}
              />
            ),
          )}
        </view>
      ))}
    </view>
  );
}
