import "./index.css";

import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// import { ISpotifyTrack } from "../../features/dashboard/dashboardSlice";
// import PlayClearIcon from "../../components/Icons/PlayClearIcon";
import SearchAllPage from "./SearchAllPage";
// import { SearchCard } from "../../components/Card/Card";
// import { TrackList } from "../../components";
import { useSearchQuery } from "../../features/api/spotify";

const SearchQueryPage = () => {
  const { searchQuery = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [principal, setPrincipal] = useState<any>(undefined);
  const [pathname, setPathname] = useState<any>({
    pathname: [],
    active: "all",
  });
  const { data, isLoading } = useSearchQuery(
    {
      types: ["track", "artist", "album", "show"],
      query: searchQuery,
      limit: 10,
    },
    { skip: !searchQuery }
  );

  useEffect(() => {
    const getPrincipal = (data: any) => {
      const { albums, artists, tracks, shows } = data;
      const album = albums.items[0];
      const artist = artists.items[0];
      const track = tracks.items[0];
      const show = shows.items[0];

      const albumCount = album ? countMatchLetters(searchQuery, album.name) : 0;
      const artistCount = artist
        ? countMatchLetters(searchQuery, artist.name)
        : 0;
      const trackCount = track ? countMatchLetters(searchQuery, track.name) : 0;
      const showCount = show ? countMatchLetters(searchQuery, show.name) : 0;

      if (albumCount > artistCount && albumCount > trackCount) {
        return album;
      } else {
        if (artistCount > showCount && artistCount > trackCount) {
          return artist;
        } else {
          if (trackCount > showCount) {
            return track;
          }
          if (showCount === 0) return undefined;
          return show;
        }
      }
    };

    const countMatchLetters = (a: string, b: string) => {
      let count = 0;
      let shorterStr = a.length > b.length ? b : a;

      for (let i = 0; i < shorterStr.length; i++) {
        if (a[i].toLocaleLowerCase() !== b[i].toLocaleLowerCase()) return count;
        count++;
      }
      return count;
    };

    if (data) {
      setPrincipal(getPrincipal(data));
    }
  }, [data]);

  useEffect(() => {
    const pathname = location.pathname.split("/");
    let active = "all";
    if (pathname.length > 3) {
      active = pathname[pathname.length - 1];
    }
    setPathname({ pathname, active });
  }, [location]);

  const handleTabClick = (value: string) => {
    navigate(value);
  };

  return principal ? (
    <div>
      <div className="search-header">
        <div
          className={`search-tab ${
            pathname.active === "all" ? "selected" : ""
          }`}
          onClick={() => handleTabClick("")}
        >
          All
        </div>
        <div
          className={`search-tab ${
            pathname.active === "artists" ? "selected" : ""
          }`}
          onClick={() => handleTabClick("artists")}
        >
          Artist
        </div>
        <div
          className={`search-tab ${
            pathname.active === "tracks" ? "selected" : ""
          }`}
          onClick={() => handleTabClick("tracks")}
        >
          Songs
        </div>
        <div
          className={`search-tab ${
            pathname.active === "shows" ? "selected" : ""
          }`}
          onClick={() => handleTabClick("shows")}
        >
          Podcasts
        </div>
        <div
          className={`search-tab ${
            pathname.active === "albums" ? "selected" : ""
          }`}
          onClick={() => handleTabClick("albums")}
        >
          Albums
        </div>
      </div>

      <Outlet />
    </div>
  ) : (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        lineHeight: "2.5rem",
      }}
    >
      No result found for " {searchQuery} "
      <br />
      Please make sure the words are spelled correctly or try using fewer or
      different words
    </div>
  );
};

export default SearchQueryPage;
