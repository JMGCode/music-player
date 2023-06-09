import "./TrackTable.css";

import { ClockIcon } from "../../Icons";
import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import { TrackTableRow } from "../TrackTableRow";
import { useAppSelector } from "../../../app/hooks";
import useBreakpoint from "../../../hooks/useBreakpoint";

const TrackTable: React.FC<{
  uri?: string;
  tracks: ISpotifyTrack[];
  headerColor?: string;
  headerTopOffset?: string;
}> = ({
  uri,
  tracks,
  headerColor = "rgba(23,23,23,1)",
  headerTopOffset = "70px",
  // headerTopOffset = "64px",
}) => {
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);
  const breakpoint = useBreakpoint();
  const hideAlbum = ["sm", "xs"];
  return (
    <div className="track-table-container">
      <table className="track-table">
        <thead
          style={{ backgroundColor: headerColor, top: headerTopOffset }}
          className="track-table-header"
        >
          <tr>
            <th style={{ width: "0px" }}></th>
            <th style={{ width: "30px" }}>#</th>
            <th>Title</th>
            {!hideAlbum.includes(breakpoint) && <th>Album</th>}
            <th style={{ width: "80px" }}>
              <ClockIcon size="18" />
            </th>
            <th style={{ width: "0px" }}></th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default TrackTable;
