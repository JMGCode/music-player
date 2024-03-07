import { FC, useEffect, useState } from "react";

import SearchCard from "./SearchCard";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";
import { useNavigate } from "react-router-dom";

interface Props {
  track: any;
  album: any;
  artist: any;
}
const SongSearchCard: FC<Props> = ({ track, album, artist }) => {
  const navigate = useNavigate();
  const [controlMutation] = useControlPlayerMutation();
  const [isPlaying, setIsPlaying] = useState(false);

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const handleCardClick = () => {
    navigate(`/album/${album.id}`);
  };

  const handleButtonClick = () => {
    if (!isPlaying) {
      controlMutation({
        deviceId: "",
        action: "play",
        args: { uris: [track.uri] },
      });
    } else {
      controlMutation({
        deviceId: "",
        action: "pause",
      });
    }
  };

  useEffect(() => {
    if (isPaused) {
      setIsPlaying(false);
    } else {
      if (playingTrack?.name === track.name) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);

  return (
    <SearchCard
      type={track.type}
      id={track.id}
      title={track.name}
      subTitle={artist.name}
      img={album?.images[1]?.url || ""}
      onClickCard={handleCardClick}
      onClickPlay={handleButtonClick}
      tempToPlay={track}
      isPlaying={isPlaying}
    />
  );
};

export default SongSearchCard;
