import { FC, useEffect, useState } from "react";

import SearchCard from "./SearchCard";
import { useAppSelector } from "../../../app/hooks";
import { useControlPlayerMutation } from "../../../features/api/spotify";
import { useGetArtistTopTracksQuery } from "../../../features/api/spotify/artist";
import { useGetMeQuery } from "../../../features/api/spotify/me";
import { useNavigate } from "react-router-dom";

interface Props {
  keyString: string;
  artist: any;
  onClick?: () => void;
  onPlayClick?: () => void;
}
const ArtistSearchCard: FC<Props> = ({
  artist,
  keyString,
  onClick,
  onPlayClick,
}) => {
  const navigate = useNavigate();
  const [controlMutation] = useControlPlayerMutation();
  const { data: user } = useGetMeQuery();
  const [tracks, setTracks] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const { data: topTracks, isLoading: isLoadingTopTracks } =
    useGetArtistTopTracksQuery(
      { artistId: artist.id, country: user?.country },
      { skip: !artist || !user?.country }
    );

  useEffect(() => {
    setTracks(topTracks?.tracks.map((track: any) => track.uri));
  }, [topTracks]);

  useEffect(() => {
    if (isPaused) {
      setIsPlaying(false);
    } else {
      //get artists names array
      const names = playingTrack?.artists.map((artist) => artist.name);
      if (names?.includes(artist.name)) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);

  const handleCardClick = () => {
    const { type, id } = artist;
    navigate(`/${type}/${id}`);
    onClick && onClick();
  };

  const handleButtonClick = () => {
    onPlayClick && onPlayClick();
    if (!isPlaying) {
      let args = {};
      const isArtistPlaying = playingTrack?.artists[0].uri === artist.uri;
      if (!isArtistPlaying) args = { uris: tracks };
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

  return (
    <SearchCard
      type={artist.type}
      id={artist.id}
      key={`${keyString}/${artist.id}`}
      title={artist.name}
      subTitle={"Artist"}
      img={artist?.images[1]?.url || ""}
      isImgCircle={true}
      onClickCard={handleCardClick}
      onClickPlay={handleButtonClick}
      isPlaying={isPlaying}
    />
  );
};

export default ArtistSearchCard;
