export function Controls({ onPressLeft, onPressRight, onPressPlace }) {
  return (
    <view className="Controls">
      <text className="Button" bindtap={onPressLeft}>
        Lijevo
      </text>
      <text className="Button" bindtap={onPressPlace}>
        Postavi
      </text>
      <text className="Button" bindtap={onPressRight}>
        Desno
      </text>
    </view>
  );
}
