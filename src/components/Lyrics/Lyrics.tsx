import "./Lyrics.css";

import Loading from "../Loading/Loading";
import { useAppSelector } from "../../app/hooks";
import useFetch from "../../hooks/useFetch";

const Lyrics = () => {
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);

  const { responseJSON, isLoading, error } = useFetch(
    `https://spotify-lyric-api.herokuapp.com/?trackid=${playingTrack?.id}`,
    { skip: !playingTrack }
  );

  return (
    <Loading isLoading={isLoading}>
      <div className="text-center lyrics ">
        {error || responseJSON?.error ? (
          "Server Error"
        ) : (
          <div>
            {responseJSON?.lines.map((line: any, index: number) => (
              <p
                key={index}
                style={{
                  borderRadius: "20px",
                  padding: "10px",
                  // backgroundColor:
                  //   index === counter && line.words !== ""
                  //     ? "rgba(255,255,255,0.1)"
                  //     : "",
                }}
              >
                {line.words}
              </p>
            ))}
          </div>
        )}
      </div>
    </Loading>
  );
};

export default Lyrics;
