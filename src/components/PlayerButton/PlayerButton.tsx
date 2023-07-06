import "./PlayerButton.css";

import { FC } from "react";
import PauseClearIcon from "../Icons/PauseClearIcon";
import PlayClearIcon from "../Icons/PlayClearIcon";
import { useControlPlayerMutation } from "../../features/api/spotify";

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
  //CARD Podcast => nothign
  //CARD Album => first of the album
  //CARD Artits =>  first of most popular
  //CARD Playlist => first on the list
  //CARD COLLECTION (both) => first element in the collection

  return (
    <div
      className="player-button"
      style={{
        width: width,
        height: height,
      }}
    >
      {state === "paused" ? (
        <PlayClearIcon
          id="playerButton"
          color="#0D0D0D"
          size={size}
          onClick={onClick}
        />
      ) : (
        <PauseClearIcon
          color="#0D0D0D"
          size={(Number(size) + 5).toString()}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default PlayerButton;
