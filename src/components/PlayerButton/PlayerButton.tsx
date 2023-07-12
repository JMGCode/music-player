import "./PlayerButton.css";

import { FC } from "react";
import PauseClearIcon from "../Icons/PauseClearIcon";
import PlayClearIcon from "../Icons/PlayClearIcon";

type ButtonStateType = "paused" | "playing";
interface IProps {
  size?: string;
  width?: string;
  height?: string;
  state: ButtonStateType;
  onClick?: any;
}

const PlayerButton: FC<IProps> = ({
  size = "20",
  width = "100%",
  height = "100%",
  state = "paused",
  onClick,
}) => {
  return (
    <div
      className="player-button"
      style={{
        width: width,
        height: height,
      }}
      onClick={onClick}
    >
      {state === "paused" ? (
        <PlayClearIcon id="playerButton" color="#0D0D0D" size={size} />
      ) : (
        <PauseClearIcon color="#0D0D0D" size={(Number(size) + 5).toString()} />
      )}
    </div>
  );
};

export default PlayerButton;
