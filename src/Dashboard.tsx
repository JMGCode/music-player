import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  useGetPlaylistTracksQuery,
  useGetPlaylistsQuery,
  useSearchByTrackQuery,
} from "./features/api/spotify/spotifySlice";

import Content from "./Layout/Content";
import Footer from "./Layout/Footer";
import { ITrack } from "./Tracks/TrackItem";
import Layout from "./Layout";
import Loading from "./Loading";
import Lyrics from "./Lyrics/Lyrics";
import Player from "./Player/Player";
import PlaylistList from "./Playlist/PlaylistList";
import Search from "./Search/Search";
import Sider from "./Layout/Sider";
import TempComponent from "./TempComponent";
import TrackList from "./Tracks/TrackList";
import { refreshCredentials } from "./features/auth/authSlice";
import useDebounce from "./hooks/useDebounce";
import { useRefreshTokenMutation } from "./features/api/serverAPI/serverSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  type LocationKeys = "search" | "lyrics" | "playlist" | "";
  const [location, setLocation] = useState<{
    curr: LocationKeys;
    prev: LocationKeys;
  }>({ curr: "search", prev: "" });

  const [searchValue, setSerachValue] = useState("");
  const { data: searchQueryResults, isLoading: searchLoading } =
    useSearchByTrackQuery(searchValue, {
      skip: searchValue === "" || location.curr !== "search",
    });
  const [playlistIdValue, setPlayListIdValue] = useState("");
  const { data: playListQueryResults = [] } = useGetPlaylistsQuery();
  const {
    data: playListSelectedQueryResults = [],
    isLoading: playlistLoading,
  } = useGetPlaylistTracksQuery(playlistIdValue, {
    skip: playlistIdValue === "",
  });

  const authState = useAppSelector((state) => state.auth);
  const [refreshTokenMutation] = useRefreshTokenMutation();

  useEffect(() => {
    const { expiresIn, refreshToken } = authState;
    console.log(expiresIn);
    const intervalId = setInterval(async () => {
      const payload = await refreshTokenMutation(refreshToken).unwrap();
      dispatch(refreshCredentials(payload));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [playingTrack, setPlayingTrack] = useState<ITrack>();
  const debounce = useDebounce();

  const chooseTrack = (track: ITrack) => {
    setPlayingTrack(track);
    // setSearch("");
  };

  const trackFilter = (tracks: ITrack[] | undefined, search: string) => {
    return tracks?.filter((track) => {
      return (
        track.title.toLowerCase().includes(search.toLowerCase()) ||
        track.artist.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const handleSearch = (value: string) => {
    setSerachValue(value);
  };

  return (
    <Layout>
      <Sider>
        <TempComponent location={location} setLocation={setLocation} />
        {/* TODO: Mover onSelect a una function fuera de la llamada del componente */}
        <PlaylistList
          title="Playlists"
          onSelect={async (playlistId: string) => {
            if (location.curr !== "playlist") {
              setLocation({ prev: location.curr, curr: "playlist" });
            }
            setPlayListIdValue(playlistId);
          }}
          playlists={playListQueryResults}
        />
      </Sider>

      {/* TODO: Cambiar content location a redux para un manejo mas sencillo */}
      <Content>
        {(location.curr === "search" || location.curr === "playlist") && (
          <div className="search-page">
            <Search
              onChange={(value: string) =>
                debounce(() => handleSearch(value), 500)
              }
            />
            {/* TODO: Pensar en una mejor forma de hacer a los componentes Loading */}
            <Loading
              isLoading={
                location.curr === "playlist" ? playlistLoading : searchLoading
              }
            >
              <TrackList
                tracks={
                  location.curr === "search"
                    ? searchQueryResults
                    : trackFilter(playListSelectedQueryResults, searchValue)
                }
                onChoose={chooseTrack}
              />
            </Loading>
          </div>
        )}

        <Lyrics playingTrack={playingTrack} show={location.curr === "lyrics"} />
      </Content>

      <Footer>
        <Player
          trackUri={playingTrack?.uri}
          playingTrack={playingTrack}
          showLyrics={location.curr === "lyrics"}
          setShowLyrics={() => {
            if (location.curr === "lyrics") {
              setLocation({
                prev: "lyrics",
                curr: location.prev,
              });
            } else {
              setLocation({
                prev: location.curr,
                curr: "lyrics",
              });
            }
          }}
        />
      </Footer>
    </Layout>
  );
};

export default Dashboard;
