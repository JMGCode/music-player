import "./Lyrics.css";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../app/hooks";
import { useGetLyricsQuery } from "../../features/api/serverAPI";

const Lyrics = () => {
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);
  const { data, isLoading, isError } = useGetLyricsQuery(
    {
      artist: playingTrack?.artists[0].name || "",
      title: playingTrack?.name || "",
    },
    { skip: !playingTrack?.name || !playingTrack?.artists }
  );

  return (
    <Loading isLoading={isLoading}>
      <div
        className="text-center lyrics scrollable"
        style={{ whiteSpace: "pre" }}
      >
        {isError ? "Server Error" : data?.lyrics}
      </div>
    </Loading>
  );
};

export default Lyrics;
