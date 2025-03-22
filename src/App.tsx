import { useCallback, useEffect, useState } from "@lynx-js/react";
import { GameOverScreen } from "./components/GameOverScreen.jsx";
import { Grid } from "./components/Grid.jsx";
import {
  checkCollision,
  clearFullLines,
  initGame,
  mergeTetromino,
  rotateTetromino,
  updateGame,
  getNextRandomTetromino,
  resetTetrominoBag,
} from "./utils/gameLogic.js";
import "./styles/App.css";

export function App() {
  const [theme, setTheme] = useState("kraken");
  const [message, setMessage] = useState("");

  const [gameState, setGameState] = useState(initGame());
  const [fallingTetromino, setFallingTetromino] = useState(
    getNextRandomTetromino(),
  );
  const [rotationIndex, setRotationIndex] = useState(0);
  const [tetrominoPos, setTetrominoPos] = useState({ row: 0, col: 4 });
  const [gameOver, setGameOver] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "kraken" ? "mist" : "kraken"));
  }, []);

  const handleRotatePress = useCallback(() => {
    const { shape, nextIndex } = rotateTetromino(
      fallingTetromino,
      rotationIndex,
    );
    // Create a mutable copy for wall-kick.
    const newPos = { ...tetrominoPos };
    const gridWidth = gameState.grid[0].length;
    const shapeWidth = shape[0].length;
    if (newPos.col < 0) {
      newPos.col = 0;
    }
    if (newPos.col + shapeWidth > gridWidth) {
      newPos.col = gridWidth - shapeWidth;
    }
    if (checkCollision(gameState.grid, shape, newPos)) {
      setMessage("Rotation blocked");
      return;
    }
    setTetrominoPos(newPos);
    setRotationIndex(nextIndex);
    setMessage("Rotated");
  }, [fallingTetromino, rotationIndex, tetrominoPos, gameState]);

  const handleLeftPress = useCallback(() => {
    const newPos = { row: tetrominoPos.row, col: tetrominoPos.col - 1 };
    if (
      !checkCollision(
        gameState.grid,
        fallingTetromino.rotations[rotationIndex],
        newPos,
      )
    ) {
      setTetrominoPos(newPos);
      setMessage("Move left");
    }
  }, [tetrominoPos, fallingTetromino, rotationIndex, gameState]);

  const handleRightPress = useCallback(() => {
    const newPos = { row: tetrominoPos.row, col: tetrominoPos.col + 1 };
    if (
      !checkCollision(
        gameState.grid,
        fallingTetromino.rotations[rotationIndex],
        newPos,
      )
    ) {
      setTetrominoPos(newPos);
      setMessage("Move right");
    }
  }, [tetrominoPos, fallingTetromino, rotationIndex, gameState]);

  const handlePlacePress = useCallback(() => {
    // Hard drop: find the lowest valid position.
    let dropPos = { ...tetrominoPos };
    while (
      !checkCollision(
        gameState.grid,
        fallingTetromino.rotations[rotationIndex],
        { row: dropPos.row + 1, col: dropPos.col },
      )
    ) {
      dropPos = { row: dropPos.row + 1, col: dropPos.col };
    }
    const mergedGrid = mergeTetromino(
      gameState.grid,
      fallingTetromino.rotations[rotationIndex],
      dropPos,
      fallingTetromino.name,
    );
    const cleared = clearFullLines(mergedGrid);
    setGameState({ grid: cleared.grid });
    setTetrominoPos({ row: 0, col: 4 });
    setMessage("Piece placed (hard drop)");

    const newTetromino = getNextRandomTetromino();
    // Check if new tetromino cannot spawn → game over.
    if (
      checkCollision(cleared.grid, newTetromino.rotations[0], {
        row: 0,
        col: 4,
      })
    ) {
      setMessage("Game Over");
      setGameOver(true);
    } else {
      setFallingTetromino(newTetromino);
      setRotationIndex(0);
    }
  }, [tetrominoPos, fallingTetromino, rotationIndex, gameState]);

  // Auto-drop the tetromino every second.
  useEffect(() => {
    if (gameOver) return; // Stop auto-drop if game over.
    const interval = setInterval(() => {
      const result = updateGame(
        gameState,
        fallingTetromino.rotations[rotationIndex],
        tetrominoPos,
        fallingTetromino.name,
      );
      setGameState(result.state);
      setTetrominoPos(result.newPos);
      if (result.landed) {
        const newTetromino = getNextRandomTetromino();
        // If new piece collides immediately at spawn, game over.
        if (
          checkCollision(result.state.grid, newTetromino.rotations[0], {
            row: 0,
            col: 4,
          })
        ) {
          setMessage("Game Over");
          setGameOver(true);
        } else {
          setFallingTetromino(newTetromino);
          setRotationIndex(0);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, fallingTetromino, rotationIndex, tetrominoPos, gameOver]);

  const restartGame = useCallback(() => {
    resetTetrominoBag();
    setGameState(initGame());
    setFallingTetromino(getNextRandomTetromino());
    setRotationIndex(0);
    setTetrominoPos({ row: 0, col: 4 });
    setMessage("");
    setGameOver(false);
  }, []);

  const appClass = `App ${theme}`;
  const buttonClass = `Button ${theme}`;

  // If game over, render GameOverScreen.
  if (gameOver) {
    return (
      <view className={appClass}>
        <GameOverScreen onRestart={restartGame} />
      </view>
    );
  }

  return (
    <view className={appClass}>
      <view className="Grid" bindtap={toggleTheme}>
        <text className={buttonClass}>Switch Theme</text>
      </view>
      <view className="Content">
        <text className="Description">Tetris Lynx</text>
        <Grid
          rows={15}
          cols={10}
          grid={gameState.grid}
          fallingTetromino={fallingTetromino}
          tetrominoPos={tetrominoPos}
          rotationIndex={rotationIndex}
          theme={theme}
        />
        <view className="Controls">
          <text className={buttonClass} bindtap={handleLeftPress}>
            Left
          </text>
          <text className={buttonClass} bindtap={handlePlacePress}>
            Place
          </text>
          <text className={buttonClass} bindtap={handleRightPress}>
            Right
          </text>
          <text className={buttonClass} bindtap={handleRotatePress}>
            Rotate
          </text>
        </view>
        <text className="Description">{message}</text>
      </view>
    </view>
  );
}
