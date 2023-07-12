import "./TrackTableRow.css";

import { FC, useEffect, useState } from "react";

import BarAnimation from "../../Icons/BarAnimation/BarAnimation";
import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import PauseClearIcon from "../../Icons/PauseClearIcon";
import PlayClearIcon from "../../Icons/PlayClearIcon";
import { getSmallestImage } from "../../../helpers";
import { getTimeString } from "../../../helpers/getTimeString";
import { useAppSelector } from "../../../app/hooks";
import useBreakpoint from "../../../hooks/useBreakpoint";
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
  const breakpoint = useBreakpoint();
  const hideAlbum = ["sm", "xs"];

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
      if (isHovered && track?.is_playable) {
        //play
        return (
          <PlayClearIcon
            size="18"
            onClick={() => {
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
    <tr
      // style={{
      //   backgroundColor: track?.is_playable ? "" : "rgba(0,0,0,0.2)",
      // }}
      className={`track-table-row ${track.is_playable ? "" : "not-playable"}`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <td></td>
      <td>{renderIndex(isPaused, isHovered, isSelected, index)}</td>
      <td>
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
          <div
            style={{
              overflow: "hidden",
              height: "100%",
              alignItems: "center",
              display: "grid",
              marginLeft: "1rem",
            }}
          >
            <div className="track-text">{track?.name}</div>
            <div className="track-artist-text">{track?.artists[0].name}</div>
          </div>
        </div>
      </td>
      {!hideAlbum.includes(breakpoint) && <td>{track.album.name}</td>}
      <td>{getTimeString(track.duration_ms / 1000)}</td>
      <td></td>
    </tr>
  );
};

export default TrackTableRow;
