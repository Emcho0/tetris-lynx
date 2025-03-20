export interface GameState {
  grid: (string | 0)[][];
}

export interface Tetromino {
  name: string;
  rotations: number[][][];
  color: string;
}

export const tetrominos: Tetromino[] = [
  {
    name: "I",
    color: "tetromino-I",
    rotations: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
  {
    name: "O",
    color: "tetromino-O",
    rotations: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  {
    name: "T",
    color: "tetromino-T",
    rotations: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "S",
    color: "tetromino-S",
    rotations: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  {
    name: "Z",
    color: "tetromino-Z",
    rotations: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "J",
    color: "tetromino-J",
    rotations: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    ],
  },
  {
    name: "L",
    color: "tetromino-L",
    rotations: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
];

export function listTetrominos(): Tetromino[] {
  return tetrominos;
}

export function rotateTetromino(
  tetromino: Tetromino,
  currentRotationIndex: number,
): { shape: number[][]; nextIndex: number } {
  const nextIndex = (currentRotationIndex + 1) % tetromino.rotations.length;
  return { shape: tetromino.rotations[nextIndex], nextIndex };
}

export function initGame(): GameState {
  const rows = 15;
  const cols = 10;
  const grid: (string | 0)[][] = [];
  for (let row = 0; row < rows; row++) {
    grid.push(new Array(cols).fill(0));
  }
  return { grid };
}

export function checkCollision(
  grid: (string | 0)[][],
  shape: number[][],
  pos: { row: number; col: number },
): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const newRow = pos.row + r;
        const newCol = pos.col + c;
        if (newRow >= grid.length || newCol < 0 || newCol >= grid[0].length)
          return true;
        if (newRow >= 0 && grid[newRow][newCol] !== 0) return true;
      }
    }
  }
  return false;
}

export function mergeTetromino(
  grid: (string | 0)[][],
  shape: number[][],
  pos: { row: number; col: number },
  tetrominoName: string,
): (string | 0)[][] {
  const newGrid = grid.map((row) => [...row]);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const newRow = pos.row + r;
        const newCol = pos.col + c;
        if (
          newRow >= 0 &&
          newRow < newGrid.length &&
          newCol >= 0 &&
          newCol < newGrid[0].length
        ) {
          newGrid[newRow][newCol] = tetrominoName;
        }
      }
    }
  }
  return newGrid;
}

export function clearFullLines(grid: (string | 0)[][]): {
  grid: (string | 0)[][];
} {
  const newGrid = grid.filter((row) => row.some((cell) => cell === 0));
  while (newGrid.length < grid.length) {
    newGrid.unshift(new Array(grid[0].length).fill(0));
  }
  return { grid: newGrid };
}

export function updateGame(
  state: GameState,
  tetrominoShape: number[][],
  pos: { row: number; col: number },
  tetrominoName: string,
): { state: GameState; newPos: { row: number; col: number }; landed: boolean } {
  const newPos = { row: pos.row + 1, col: pos.col };
  if (checkCollision(state.grid, tetrominoShape, newPos)) {
    const mergedGrid = mergeTetromino(
      state.grid,
      tetrominoShape,
      pos,
      tetrominoName,
    );
    const cleared = clearFullLines(mergedGrid);
    return {
      state: { grid: cleared.grid },
      newPos: { row: 0, col: 4 },
      landed: true,
    };
  } else {
    return { state, newPos, landed: false };
  }
}
