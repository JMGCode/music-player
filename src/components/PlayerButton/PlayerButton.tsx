import "./PlayerButton.css";

import { FC } from "react";
import PlayClearIcon from "../Icons/PlayClearIcon";
import { useControlPlayerMutation } from "../../features/api/spotify";

interface IProps {
  size?: string;
  width?: string;
  height?: string;
  track?: any;
  onClick?: any;
}

const PlayerButton: FC<IProps> = ({
  size = "20",
  width = "100%",
  height = "100%",
  track,
  onClick,
}) => {
  const [controlMutation] = useControlPlayerMutation();

  //if context_uri already playing change icon for a pause, and make a pause action on click
  // if the context_uri selected but not playing omit the offset position to resume from the current track and position
  // so if the context_uri is selected but not playing is more a resume action
  const handleClick = (uri: any) => {
    //CARD Podcast => nothign

    //CARD Album => first of the album
    //CARD Artits =>  first of most popular
    //CARD Playlist => first on the list
    //CARD COLLECTION (both) => first element in the collection
    const args = {
      context_uri: uri,
      offset: {
        position: 0,
      },
      position_ms: 0,
    };

    controlMutation({
      //no deviceId means it will play on the curr device
      deviceId: "",
      action: "play",
      args,
    });
  };
  return (
    <div
      className="player-button"
      onClick={handleClick}
      style={{
        width: width,
        height: height,
      }}
    >
      {
        <PlayClearIcon
          id="playerButton"
          color="#0D0D0D"
          size={size}
          onClick={onClick}
        />
      }
    </div>
  );
};

export default PlayerButton;
