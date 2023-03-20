import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { SearchHeader } from "../../Layout/Header";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const { searchQuery } = useParams();
  const location = useLocation();

  useEffect(() => {
    searchQuery && setSearch(searchQuery);
  }, []);
  // const { data: tracks = [], isLoading } = useSearchByTrackQuery(search, {
  //   skip: search === "",
  // });
  const debounce = useDebounce();
  const navigate = useNavigate();
  const handleSearch = (value: string) => {
    const pathname = location.pathname.split("/");

    if (pathname.length > 3) {
      if (!value) {
        navigate(`/search/`);
      } else {
        navigate(`/search/${value}/${pathname[pathname.length - 1]}`);
      }
    } else {
      navigate(`/search/${value}`);
    }
  };

  return (
    <div className="search-page">
      <SearchHeader
        setSearch={setSearch}
        search={search}
        onChange={(value: string) => debounce(() => handleSearch(value), 500)}
      />
      <Outlet />
    </div>
  );
};

export default SearchPage;
