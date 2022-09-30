import "./TrackItem.css";

import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import { getSmallestImage } from "../../../helpers";
import { useAppSelector } from "../../../app/hooks";

interface Props {
  track: ISpotifyTrack | undefined;
  chooseTrack: Function;
}

const TrackItem: React.FC<Props> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  const albumImg = getSmallestImage(track?.album.images || []);
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);

  return (
    <div
      className={`track-item ${
        playingTrack?.id === track?.id ? "selected" : ""
      }`}
      onClick={() => {
        handlePlay();
      }}
    >
      {track && (
        <img
          src={albumImg.url}
          alt=""
          style={{ height: "64px", width: "64px" }}
        />
      )}
      <div className="ms-3">
        <div className="track-text">{track?.name}</div>
        <div className="track-artist-text">{track?.artists[0].name}</div>
      </div>
    </div>
  );
};

export default TrackItem;
