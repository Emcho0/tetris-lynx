import { useCallback, useState } from "@lynx-js/react";
import { Grid } from "./components/Grid.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";
import "./styles/App.css";
import { Controls } from "./components/Controls.jsx";

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
      {/* Tap to toggle theme */}
      <view className="Grid" bindtap={toggleTheme}>
        <text className={buttonClass}>Switch Theme</text>
      </view>
      <view className="Content">
        <text className="Description">Tetris Lynx</text>
        <Grid rows={15} cols={10} />
        <view className="ScoreAndControls">
          <view className="Score">
            <ScoreBoard score={0} />
          </view>
          <view className="Controls">
            <Controls />
          </view>
        </view>
      </view>
    </view>
  );
}
