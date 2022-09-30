import "./TrackTable.css";

import { FC, useState } from "react";

import { ClockIcon } from "../../Icons";
import { ISpotifyTrack } from "../../../features/dashboard/dashboardSlice";
import TrackItem from "../TrackItem/TrackItem";
import { TrackTableRow } from "../TrackTableRow";
import { getTimeString } from "../../../helpers/getTimeString";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";
import useObservableIntersection from "../../../hooks/useObservableIntersection";

const TrackTable: React.FC<{ uri?: string; tracks: ISpotifyTrack[] }> = ({
  uri,
  tracks,
}) => {
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);
  const [trans, setTrans] = useState(true);
  const obFn = (entries: any) => {
    const ratio = entries[0].intersectionRatio;
    if (ratio <= 0.4 && trans) {
      setTrans(false);
    } else {
      setTrans(true);
    }
  };

  const obOptions = {
    threshold: [0.3, 0.4, 0.5],
  };

  const obs = useObservableIntersection(obFn, obOptions);
  if (obs) {
    const tr = document.querySelector(".playlist-header");
    if (tr) obs?.observe(tr);
  }
  return (
    <div className="track-table">
      <div
        style={{ backgroundColor: trans ? "" : "rgba(23, 23, 23, 1)" }}
        className="track-table-header"
      >
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        <ClockIcon size="18" />
      </div>
      <div className="track-table-main">
        {tracks.map((track, index) => {
          return (
            <TrackTableRow
              track={track}
              uri={uri}
              index={index}
              key={track.uri}
              isSelected={playingTrack?.id === track?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackTable;
