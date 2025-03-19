interface ScoreBoardProps {
  score: number;
}

export function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <view className="ScoreBoard">
      <text className="Score">Score: {score}</text>
    </view>
  );
}
