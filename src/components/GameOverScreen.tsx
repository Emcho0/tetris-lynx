import "./GameOverScreen.css";

export function GameOverScreen({ onRestart }) {
  return (
    <view className="GameOverScreen">
      <text className="GameOverText">Game Over</text>
      <text className="RestartButton" bindtap={onRestart}>
        Restart
      </text>
    </view>
  );
}
