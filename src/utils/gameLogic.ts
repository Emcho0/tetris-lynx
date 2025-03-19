export interface GameState {
  grid: number[][]; // 0 = empty, 1-7 = tetromino types
  score: number;
}

export function initGame(): GameState {
  const rows = 15; // 15 rows for Tetris
  const cols = 10; // 10 columns for Tetris
  const grid: number[][] = [];

  for (let row = 0; row < rows; row++) {
    const rowData: number[] = [];
    for (let col = 0; col < cols; col++) {
      rowData.push(0);
    }
    grid.push(rowData);
  }

  return { grid, score: 0 };
}

export function updateGame(state: GameState): GameState {
  // For now, we just return the state unchanged (or update the score, etc.)
  return { ...state };
}
