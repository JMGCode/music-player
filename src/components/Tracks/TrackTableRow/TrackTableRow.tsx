import "./TrackTableRow.css";

import { FC, useState } from "react";

import BarAnimation from "../../Icons/BarAnimation/BarAnimation";
import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import PauseClearIcon from "../../Icons/PauseClearIcon";
import PlayClearIcon from "../../Icons/PlayClearIcon";
import { getSmallestImage } from "../../../helpers";
import { getTimeString } from "../../../helpers/getTimeString";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";

interface IProps {
  index: number;
  track: ISpotifyTrack;
  uri: string | undefined;
}
const TrackTableRow: FC<IProps> = ({ index, track, uri }) => {
  const [controlMutation] = useControlPlayerMutation();
  const albumImg = getSmallestImage(track?.album.images || []);
  const [isHovered, setIsHovered] = useState(false);
  const isPaused = useAppSelector((state) => state.dashboard.isPaused);
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);

  const isSelected =
    playingTrack?.id === track.id || playingTrack?.name === track.name;

  const handlePlay = (value: ISpotifyTrack) => {
    const args = uri
      ? {
          context_uri: uri,
          offset: {
            position: index,
          },
          position_ms: 0,
        }
      : {
          uris: [value.uri],

          position_ms: 0,
        };

    controlMutation({
      deviceId: "",
      action: "play",
      args,
    });
  };

  const handlePause = () => {
    controlMutation({
      deviceId: "",
      action: "pause",
    });
  };

  const renderIndex = (
    isPaused: boolean,
    isHovered: boolean,
    isSelected: boolean,
    index: number
  ) => {
    if (isSelected) {
      if (isHovered) {
        if (isPaused) {
          //play
          return (
            <PlayClearIcon
              size="18"
              onClick={() => {
                console.log("second play button");
                handlePlay(track);
              }}
            />
          );
        } else {
          //pause
          return <PauseClearIcon size="18" onClick={handlePause} />;
        }
      } else {
        if (isPaused) {
          //green
          return (
            <div className={`track-table-index`} style={{ color: "#56bd40" }}>
              {index + 1}
            </div>
          );
        } else {
          //bar
          return <BarAnimation size={18} color="#56bd40" />;
        }
      }
    } else {
      if (isHovered) {
        //play
        return (
          <PlayClearIcon
            size="18"
            onClick={() => {
              console.log("second play button");
              handlePlay(track);
            }}
          />
        );
      } else {
        //num
        return <div className={`track-table-index`}>{index + 1}</div>;
      }
    }
  };

  return (
    <div
      className={`track-table-row `}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {renderIndex(isPaused, isHovered, isSelected, index)}
      <div
        className={`track-table-title ${isSelected ? "selected" : ""}`}
        onClick={() => {
          console.log("handle play");
        }}
      >
        {track && (
          <img
            src={albumImg.url}
            alt=""
            style={{ height: "45px", width: "45px" }}
            // style={{ height: "64px", width: "64px" }}
          />
        )}
        <div className="ms-3">
          <div className="track-text">{track?.name}</div>
          <div className="track-artist-text">{track?.artists[0].name}</div>
        </div>
      </div>
      <div>{track.album.name}</div>

      <div>{getTimeString(track.duration_ms / 1000)}</div>
    </div>
  );
};

export default TrackTableRow;
