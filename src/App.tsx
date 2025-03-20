import { useCallback, useState } from "@lynx-js/react";
import { Grid } from "./components/Grid.jsx";
import { ScoreBoard } from "./components/ScoreBoard.jsx";
import "./styles/App.css";
import { Controls } from "./components/Controls.jsx";

export function App() {
  const [theme, setTheme] = useState("kraken");
  const [message, setMessage] = useState("");
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "kraken" ? "mist" : "kraken"));
  }, []);

  const handleLeftPress = useCallback(() => {
    setMessage("Idemo lijevo");
  }, []);

  const handleRightPress = useCallback(() => {
    setMessage("Idemo desno");
  }, []);

  const handlePlacePress = useCallback(() => {
    setMessage("Postavljamo blokove");
  }, []);

  const appClass = `App ${theme}`;
  const buttonClass = `Button ${theme}`;

  return (
    <view className={appClass}>
      {/* Tipka za mijenjanje teme */}
      <view className="Grid" bindtap={toggleTheme}>
        <text className={buttonClass}>Switch Theme</text>
      </view>
      <view className="Content">
        <text className="Description">Tetris Lynx</text>
        <Grid rows={15} cols={10} />
        <view className="ScoreAndControls">
          <view className="ScoreControlsRow">
            <view className="Score">
              <ScoreBoard score={0} />
            </view>
            <view className="Controls">
              <Controls
                onPressLeft={handleLeftPress}
                onPressPlace={handlePlacePress}
                onPressRight={handleRightPress}
              />
            </view>
          </view>
          <text className="Description">{message}</text>
        </view>
      </view>
    </view>
  );
}
