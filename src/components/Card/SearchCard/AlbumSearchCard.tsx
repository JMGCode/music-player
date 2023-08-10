import { FC, useEffect, useState } from "react";

import SearchCard from "./SearchCard";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";
import { useNavigate } from "react-router-dom";

interface Props {
  album: any;
  keyString: string;
  onClick?: () => void;
  onPlayClick?: () => void;
}

const AlbumSearchCard: FC<Props> = ({
  keyString,
  album,
  onClick,
  onPlayClick,
}) => {
  const navigate = useNavigate();
  const [controlMutation] = useControlPlayerMutation();
  const [isPlaying, setIsPlaying] = useState(false);

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const handleCardClick = () => {
    navigate(`/album/${album.id}`);
    onClick && onClick();
  };

  const handleButtonClick = () => {
    onPlayClick && onPlayClick();
    if (!isPlaying) {
      const isAlbumPlaying = playingTrack?.album.uri === album.uri;
      let args = {};
      if (!isAlbumPlaying) {
        args = { context_uri: album.uri };
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
      const isAlbumPlaying = playingTrack?.album.uri === album.uri;
      if (isAlbumPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);

  const artistName = album.artists[0].name;
  const year = album.release_date.split("-")[0];

  const subtitle = `${year} • ${artistName}` || "Album";
  return (
    <SearchCard
      type={album.type}
      id={album.id}
      key={`${keyString}/${album.id}`}
      title={album.name}
      subTitle={subtitle}
      img={album?.images[1]?.url || ""}
      onClickCard={handleCardClick}
      onClickPlay={handleButtonClick}
      isPlaying={isPlaying}
    />
  );
};

export default AlbumSearchCard;
