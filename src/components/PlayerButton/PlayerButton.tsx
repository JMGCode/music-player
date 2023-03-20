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

  return (
    <div
      className="player-button"
      onClick={(e) => {
        // e.stopPropagation();

        if (!track) return;
        // TODO esto no es correcto es solo temporal (borrar este comentario si esta resuelto)
        const uri = track.uri;
        const value = track;

        const args = uri
          ? //album
            {
              context_uri: uri,
              offset: {
                position: 0,
              },
              position_ms: 0,
            }
          : //track
            {
              uris: [value.uri],

              position_ms: 0,
            };

        controlMutation({
          //no deviceId means it will play on the curr device
          deviceId: "",
          action: "play",
          args: {
            uris: [""],
            position_ms: 0,
          },
        });
      }}
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
