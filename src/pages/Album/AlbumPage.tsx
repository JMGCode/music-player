import "./AlbumPage.css";

import {
  useControlPlayerMutation,
  useGetAlbumTracksQuery,
} from "../../features/api/spotify";
import { useEffect, useState } from "react";

import { ISpotifyTrack } from "../../features/dashboard/dashboardSlice";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { TrackTable } from "../../components";
import { getTimeFromSec } from "../../helpers";
import { useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const [controlMutation] = useControlPlayerMutation();
  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [alpha, setAlpha] = useState(0);
  const [search, setSearch] = useState("");
  const { albumId = "" } = useParams();
  const { data, isLoading } = useGetAlbumTracksQuery(albumId, {
    skip: albumId === "",
  });

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
      if (data?.uri === playingTrack?.album.uri) {
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
            const isAlbumPlaying = playingTrack?.album.uri === data?.uri;
            let args = {};
            if (!isAlbumPlaying) {
              args = { context_uri: data.uri };
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
          <div>ALBUM</div>
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
      <ScrollHeaderContent noPadding>
        <TrackTable
          headerColor={`rgba(23,23,23,${alpha})`}
          uri={data?.uri}
          tracks={trackFilter(data?.tracks, search)}
        />
      </ScrollHeaderContent>
    </>
  );
};

export default AlbumPage;
