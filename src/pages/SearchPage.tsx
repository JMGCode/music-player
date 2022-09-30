import { useState } from "react";

import { Search, TrackList, Loading } from "../components";
import useDebounce from "../hooks/useDebounce";
import { useSearchByTrackQuery } from "../features/api/spotify";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const { data: tracks = [], isLoading } = useSearchByTrackQuery(search, {
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
