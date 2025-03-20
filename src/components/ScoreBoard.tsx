interface ScoreBoardProps {
  score: number;
}

export function ScoreBoard({ score }: ScoreBoardProps) {
  // Prikazuje tekst za trenutni rezultat (nije implementirano jos)
  return (
    <view className="ScoreBoard">
      <text className="Score">Score: {score}</text>
    </view>
  );
}
