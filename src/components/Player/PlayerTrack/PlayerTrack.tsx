import "./PlayerTrack.css";

import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import { getSmallestImage } from "../../../helpers";

interface Props {
  track: ISpotifyTrack | undefined;
  chooseTrack: Function;
}

const PlayerTrack: React.FC<Props> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  const albumImg = getSmallestImage(track?.album?.images || []);
  return (
    <div
      className="player-track-container"
      style={{ cursor: "pointer", padding: ".5rem" }}
      onClick={handlePlay}
    >
      {track ? (
        <img
          src={albumImg?.url}
          alt=""
          style={{ height: "64px", width: "64px" }}
        />
      ) : (
        <div style={{ height: "64px", width: "64px" }}></div>
      )}
      <div style={{ marginLeft: "1rem" }}>
        <div className="player-track-name">{track?.name}</div>
        <div className="text-muted">{track?.artists?.[0]?.name || ""}</div>
      </div>
    </div>
  );
};

export default PlayerTrack;

/**
 * 
 * {
    "status": 404,
    "message": "Device not found"
}
 */
