import "./TrackTable.css";

import { ClockIcon } from "../../Icons";
import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import { TrackTableRow } from "../TrackTableRow";
import { useAppSelector } from "../../../app/hooks";

const TrackTable: React.FC<{
  uri?: string;
  tracks: ISpotifyTrack[];
  headerColor?: string;
}> = ({ uri, tracks, headerColor = "rgba(23,23,23,1)" }) => {
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);

  return (
    <div className="track-table">
      <div
        style={{ backgroundColor: headerColor }}
        className="track-table-header"
      >
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        <ClockIcon size="18" />
      </div>
      <div className="track-table-main">
        {tracks?.map((track, index) => {
          return (
            <TrackTableRow
              track={track}
              uri={uri}
              index={index}
              key={"tableRow" + track.uri + index}
              // isSelected={playingTrack?.id === track?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackTable;
