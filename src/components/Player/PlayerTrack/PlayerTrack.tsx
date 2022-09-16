interface ISearchResults {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

interface Props {
  track: ISearchResults;
  chooseTrack: Function;
}

const PlayerTrack: React.FC<Props> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        alt=""
        style={{ height: "64px", width: "64px" }}
      />
      <div className="ms-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
};

export default PlayerTrack;
