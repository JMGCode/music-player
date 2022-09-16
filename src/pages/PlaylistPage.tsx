import { FC, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useGetPlaylistTracksQuery } from "../features/api/spotify/spotifySlice";
import useDebounce from "../hooks/useDebounce";
import Loading from "../Loading";
import Search from "../Search/Search";
import { ITrack } from "../Tracks/TrackItem";
import TrackList from "../Tracks/TrackList";

const PlaylistPage = () => {
  const [search, setSearch] = useState("");
  const { playlistId = "" } = useParams();
  const { data: tracks = [], isLoading } = useGetPlaylistTracksQuery(
    playlistId,
    {
      skip: playlistId === "",
    }
  );

  const debounce = useDebounce();
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const trackFilter = (tracks: ITrack[] | undefined, search: string) => {
    return tracks?.filter((track) => {
      return (
        track.title.toLowerCase().includes(search.toLowerCase()) ||
        track.artist.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <div className="search-page">
      <Search
        onChange={(value: string) => debounce(() => handleSearch(value), 500)}
      />
      <Loading isLoading={isLoading}>
        <TrackList tracks={trackFilter(tracks, search)} />
      </Loading>
    </div>
  );
};

export default PlaylistPage;
