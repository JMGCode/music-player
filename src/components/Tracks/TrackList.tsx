import TrackItem, { ITrack } from "./TrackItem";
import { useAppDispatch } from "../../app/hooks";
import { setPlayingTrack } from "../../features/dashboard/dashboardSlice";
interface ITracks {
  tracks: ITrack[] | undefined;
}

const TrackList: React.FC<ITracks> = ({ tracks }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="scrollable">
      <div className="flex-grow-1 my-2">
        {tracks?.map((track, index) => {
          return (
            <TrackItem
              track={track}
              key={track.uri + index}
              chooseTrack={(value: ITrack) => {
                dispatch(setPlayingTrack(value));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
