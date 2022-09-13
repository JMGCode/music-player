import "./Dashboard.css";

import React, { useState } from "react";

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
import { getSmallestImage } from "./helpers";
import { useAuthContext } from "./hooks/useAuth";
import useDebounce from "./hooks/useDebounce";

const Dashboard: React.FC = () => {
  type LocationKeys = "search" | "lyrics" | "playlist" | "";
  const { spotifyApi } = useAuthContext();

  const [location, setLocation] = useState<{
    curr: LocationKeys;
    prev: LocationKeys;
  }>({ curr: "search", prev: "" });

  const [playlistResults, setPlaylistResults] = useState<ITrack[] | undefined>(
    []
  );
  const [filterPlaylistResults, setFilterPlaylistResults] = useState<
    ITrack[] | undefined
  >([]);
  const [searchResults, setSearchResults] = useState<ITrack[] | undefined>([]);
  const [playingTrack, setPlayingTrack] = useState<ITrack>();
  const [isLoading, setIsLoding] = useState(false);

  const debounce = useDebounce();

  const chooseTrack = (track: ITrack) => {
    setPlayingTrack(track);
    // setSearch("");
  };

  const getTracks = async (search: string) => {
    if (!search) return setSearchResults([]);
    setIsLoding(true);

    const data = await spotifyApi?.searchTracks(search);

    const result: ITrack[] | undefined = data?.body.tracks?.items.map(
      (item) => {
        const smallestImage = getSmallestImage(item.album.images);

        return {
          artist: item.artists[0].name,
          title: item.name,
          uri: item.uri,
          albumUrl: smallestImage.url,
        };
      }
    );

    //TODO:Split constrains get shouldnt set
    if (result === undefined) setSearchResults([]);
    setSearchResults(result);

    setIsLoding(false);
  };

  const getPlaylistTracks = async (playlistId: string) => {
    const data = await spotifyApi?.getPlaylist(playlistId);

    const result: ITrack[] | undefined = data?.body.tracks.items
      .filter((item) => item.track !== null)
      .map((item) => {
        const track = item?.track;
        if (!track) return { artist: "", title: "", uri: "", albumUrl: "" };

        const smallestImage = getSmallestImage(track.album.images);

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestImage.url,
        };
      });
    return result;
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
    if (location.curr === "search") {
      getTracks(value);
    }
    if (location.curr === "playlist") {
      const newTracks = trackFilter(playlistResults, value);
      setFilterPlaylistResults(newTracks);
    }
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
            setPlaylistResults([]);
            setFilterPlaylistResults([]);
            const results = await getPlaylistTracks(playlistId);
            setPlaylistResults(results);
            setFilterPlaylistResults(results);
          }}
        />
      </Sider>
      {/* TODO: Cambiar content location a redux para un manejo mas sencillo */}
      <Content>
        {(location.curr === "search" || location.curr === "playlist") && (
          <div className="search-page">
            <Search
              // onChange={(value: string) =>
              //   debounce(() => handleSearch(value), 500)
              // }
              onChange={(value: string) =>
                debounce(() => handleSearch(value), 500)
              }
            />
            {/* TODO: Pensar en una mejor forma de hacer a los componentes Loading */}
            <Loading isLoading={isLoading}>
              <TrackList
                tracks={
                  location.curr === "search"
                    ? searchResults
                    : filterPlaylistResults
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
