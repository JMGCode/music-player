import TrackItem, { ITrack } from "./TrackItem";
interface ITracks {
  tracks: ITrack[] | undefined;
  onChoose: Function;
}

const TrackList: React.FC<ITracks> = ({ tracks, onChoose }) => {
  return (
    <div className="scrollable">
      <div className="flex-grow-1 my-2">
        {tracks?.map((track, index) => {
          return (
            <TrackItem
              track={track}
              key={track.uri + index}
              chooseTrack={onChoose}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
