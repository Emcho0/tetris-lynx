import { useCallback, useState } from "@lynx-js/react";
import { Grid } from "./components/Grid.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";
import "./styles/App.css";

export function App() {
  // Default theme is Yorumi Shade ("shade")
  const [theme, setTheme] = useState("shade");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "shade" ? "mist" : "shade"));
  }, []);

  const appClass = `App ${theme}`;
  const buttonClass = `Button ${theme}`;

  return (
    <view className={appClass}>
      <view className="Content">
        <text className="Description">Tetris Lynx</text>
        <Grid rows={15} cols={10} />
        <view className="Score">
          <ScoreBoard score={0} />
        </view>
        {/* Tap to toggle theme */}
        <view bindtap={toggleTheme}>
          <text className={buttonClass}>Switch Theme</text>
        </view>
      </view>
    </view>
  );
}
