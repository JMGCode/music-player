import { FC, useState } from "react";

import Loading from "../Loading";
import Search from "../Search/Search";
import TrackList from "../Tracks/TrackList";
import useDebounce from "../hooks/useDebounce";
import { useSearchByTrackQuery } from "../features/api/spotify/spotifySlice";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const { data: tracks, isLoading } = useSearchByTrackQuery(search, {
    skip: search === "",
  });
  const debounce = useDebounce();
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="search-page">
      <Search
        onChange={(value: string) => debounce(() => handleSearch(value), 500)}
      />
      <Loading isLoading={isLoading}>
        <TrackList tracks={tracks} />
      </Loading>
    </div>
  );
};

export default SearchPage;
