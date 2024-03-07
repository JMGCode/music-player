import "../Playlist/PlaylistPage.css";

import {
  useGetLikedTracksQuery,
  useGetMeQuery,
} from "../../features/api/spotify/me";

import { ISpotifyTrack } from "../../features/dashboard/dashboardSlice";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { TrackTable } from "../../components";
import { getTimeFromSec } from "../../helpers";
import { useAppSelector } from "../../app/hooks";
import { useControlPlayerMutation } from "../../features/api/spotify";
import { useParams } from "react-router-dom";
import { useState } from "react";

const LikedPlaylistPage = () => {
  const [controlMutation] = useControlPlayerMutation();
  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const { data: user } = useGetMeQuery();
  const [alpha, setAlpha] = useState(0);
  const [search, setSearch] = useState("");
  const { playlistId = "" } = useParams();

  const { data: likedTracks, isLoading: isLoadingLikedTracks } =
    useGetLikedTracksQuery();

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

  // useEffect(() => {
  //   if (isPaused) {
  //     setIsPlaying(false);
  //   } else {
  //     if (data?.uri === playingTrack?.context.uri) {
  //       setIsPlaying(true);
  //     } else {
  //       setIsPlaying(false);
  //     }
  //   }
  // }, [playingTrack]);

  console.log("likedTracks", likedTracks);
  return (
    <>
      <ScrollHeader
        title={"Liked Songs"}
        isPlaying={isPlaying}
        // onPlay={() => {
        //   if (!isPlaying) {
        //     const isPlaylistPlaying = playingTrack?.context.uri === data?.uri;

        //     let args = {};
        //     if (!isPlaylistPlaying) {
        //       args = { context_uri: data?.uri };
        //     }

        //     controlMutation({
        //       deviceId: "",
        //       action: "play",
        //       args,
        //     });
        //   } else {
        //     controlMutation({
        //       deviceId: "",
        //       action: "pause",
        //     });
        //   }
        // }}
        onAlphaChange={handleAlpha}
      >
        <img src={""} alt="" className="liked-playlist-header-img" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <div className="playlist-name">{"Liked Songs"}</div>
          {/* <span>
            {data?.owner} - {data?.total} songs,{" "}
            <span className="playlist-duration">
              {getListRepTime(data?.tracks)}
            </span>
          </span> */}
        </div>
      </ScrollHeader>
      {/* ==========Content of the page========== */}
      <TrackTable
        headerColor={`rgba(23,23,23,${alpha})`}
        tracks={likedTracks?.items.map((item: any) => item.track)}
      />
    </>
  );
};

export default LikedPlaylistPage;
