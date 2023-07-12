import "./PlaylistPage.css";

import {
  useControlPlayerMutation,
  useGetPlaylistTracksQuery,
} from "../../features/api/spotify";
import { useEffect, useState } from "react";

import { ISpotifyTrack } from "../../features/dashboard/dashboardSlice";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { TrackTable } from "../../components";
import { getTimeFromSec } from "../../helpers";
import { useAppSelector } from "../../app/hooks";
import { useGetMeQuery } from "../../features/api/spotify/me";
import { useParams } from "react-router-dom";

const PlaylistPage = () => {
  const [controlMutation] = useControlPlayerMutation();
  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const { data: user } = useGetMeQuery();
  const [alpha, setAlpha] = useState(0);
  const [search, setSearch] = useState("");
  const { playlistId = "" } = useParams();
  const { data, isLoading } = useGetPlaylistTracksQuery(
    { id: playlistId, market: user?.country },
    {
      skip: playlistId === "" || user?.country === undefined,
    }
  );

  // const debounce = useDebounce();
  // const handleSearch = (value: string) => {
  //   setSearch(value);
  // };

  const trackFilter = (tracks: ISpotifyTrack[] | undefined, search: string) => {
    return (
      tracks?.filter((track) => {
        return (
          track.name.toLowerCase().includes(search.toLowerCase()) ||
          track.artists[0].name.toLowerCase().includes(search.toLowerCase())
        );
      }) || []
    );
  };

  const getListRepTime = (tracks: ISpotifyTrack[] | undefined) => {
    let playlistDuration =
      tracks?.reduce((acc, curr) => {
        acc += curr.duration_ms;
        return acc;
      }, 0) || 0;
    return getTimeFromSec(playlistDuration / 1000);
  };

  const handleAlpha = (value: number) => setAlpha(value);

  useEffect(() => {
    if (isPaused) {
      setIsPlaying(false);
    } else {
      if (data?.uri === playingTrack?.context.uri) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);

  return (
    <>
      <ScrollHeader
        title={data?.name}
        isPlaying={isPlaying}
        onPlay={() => {
          if (!isPlaying) {
            const isPlaylistPlaying = playingTrack?.context.uri === data?.uri;

            let args = {};
            if (!isPlaylistPlaying) {
              args = { context_uri: data?.uri };
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
        }}
        onAlphaChange={handleAlpha}
      >
        <img src={data?.image} alt="" className="playlist-header-img" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <div>{data?.public ? "Public" : "Private"} List</div>
          <div className="playlist-name">{data?.name}</div>
          <span>
            {data?.owner} - {data?.total} songs,{" "}
            <span className="playlist-duration">
              {getListRepTime(data?.tracks)}
            </span>
          </span>
        </div>
      </ScrollHeader>
      {/* ==========Content of the page========== */}
      <TrackTable
        headerColor={`rgba(23,23,23,${alpha})`}
        uri={data?.uri}
        tracks={trackFilter(data?.tracks, search)}
      />
    </>
  );
};

export default PlaylistPage;
