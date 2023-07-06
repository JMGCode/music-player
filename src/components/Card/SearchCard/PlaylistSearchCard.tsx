import { FC, useEffect, useState } from "react";

import SearchCard from "./SearchCard";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";
import { useNavigate } from "react-router-dom";

interface Props {
  playlist: any;
  keyString: string;
}
const PlaylistSearchCard: FC<Props> = ({ keyString, playlist }) => {
  const navigate = useNavigate();
  const [controlMutation] = useControlPlayerMutation();
  const [isPlaying, setIsPlaying] = useState(false);

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const handleCardClick = () => {
    const { id } = playlist;
    navigate(`/playlist/${id}`);
  };

  const handleButtonClick = () => {
    const isPlaylistPlaying =
      "spotify:playlist:" + playlist.id === playingTrack?.context.uri;
    if (!isPlaying) {
      let args = {};
      if (!isPlaylistPlaying) {
        args = { context_uri: "spotify:playlist:" + playlist.id };
      }
      controlMutation({
        deviceId: "",
        action: "play",
        args,
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
      const isPlaylistPlaying =
        "spotify:playlist:" + playlist.id === playingTrack?.context.uri;
      if (isPlaylistPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);
  return (
    <SearchCard
      key={`${keyString}/${playlist.id}`}
      title={playlist.name}
      subTitle={`By ${playlist.ownerName}`}
      type={"playlist"}
      id={playlist.id}
      img={playlist.images[0]?.url || ""}
      onClickCard={handleCardClick}
      onClickPlay={handleButtonClick}
      isPlaying={isPlaying}
    />
  );
};

export default PlaylistSearchCard;
