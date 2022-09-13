import "./Lyrics.css";

import { useEffect, useState } from "react";

import { ITrack } from "../Tracks/TrackItem";
import Loading from "../Loading";
import axios from "axios";

interface ILyrics {
  playingTrack: ITrack | undefined;
  show: boolean;
}

//TODO: Mover request fuera del componente para que no se vuelva a pedir en caso de ser
//oculto con conditional render, si no se tendira que pasar siempre un prop que le diga
//cuando renderear dentro del mismo componente
const Lyrics: React.FC<ILyrics> = ({ playingTrack, show }) => {
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoding] = useState(false);
  useEffect(() => {
    if (!playingTrack) return;
    setIsLoding(true);
    setTimeout(() => {
      axios
        .get("http://localhost:3001/lyrics", {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        })
        .then((res) => {
          setLyrics(res.data.lyrics);
          setIsLoding(false);
        })
        .catch(() => {
          setLyrics("Server Error");
        });
    }, 1500);
  }, [playingTrack]);

  return (
    <>
      {show ? (
        <Loading isLoading={isLoading}>
          <div
            className="text-center lyrics scrollable"
            style={{ whiteSpace: "pre" }}
          >
            {lyrics}
          </div>
        </Loading>
      ) : (
        ""
      )}
    </>
  );
};

export default Lyrics;
