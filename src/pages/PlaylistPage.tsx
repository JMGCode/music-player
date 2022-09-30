import "./index.css";

import { Loading, Search, TrackList, TrackTable } from "../components";

import { ISpotifyTrack } from "../features/dashboard/dashboardSlice";
import { PlayIcon } from "../components/Icons";
import { getTimeFromSec } from "../helpers";
import useDebounce from "../hooks/useDebounce";
import { useGetPlaylistTracksQuery } from "../features/api/spotify";
import useObservableIntersection from "../hooks/useObservableIntersection";
import { useParams } from "react-router-dom";
import { useState } from "react";

const PlaylistPage = () => {
  const [search, setSearch] = useState("");
  const { playlistId = "" } = useParams();
  const { data, isLoading } = useGetPlaylistTracksQuery(playlistId, {
    skip: playlistId === "",
  });

  const debounce = useDebounce();
  const handleSearch = (value: string) => {
    setSearch(value);
  };

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

  const [trans, setTrans] = useState(false);
  const obFn = (entries: any) => {
    const ratio = entries[0].intersectionRatio;
    if (ratio <= 0.4 && !trans) {
      setTrans(true);
    } else {
      setTrans(false);
    }
  };

  const obOptions = {
    threshold: [0.3, 0.4, 0.5, 0.6, 0.8, 1],
  };

  const obs = useObservableIntersection(obFn, obOptions);
  if (obs) {
    const tr = document.querySelector(".playlist-header");
    if (tr) obs?.observe(tr);
  }

  return (
    <div className="scrollable" style={{ position: "relative" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <div className={`playlist-scroll-title ${trans ? "visiblea" : ""}`}>
          <PlayIcon
            size="50"
            color={trans ? "#56bd40" : "rgba(0, 0, 0, 0.00)"}
          />
          <span>{data?.name}</span>
        </div>
      </div>
      <div className="playlist-header">
        <img
          src={data?.image}
          alt=""
          style={{ height: "260px", width: "260px" }}
        />
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
      </div>

      <TrackTable uri={data?.uri} tracks={trackFilter(data?.tracks, search)} />
    </div>
  );
};

export default PlaylistPage;

{
  /* <div className="playlist-table"></div> */
}
{
  /* <Search
  onChange={(value: string) => debounce(() => handleSearch(value), 500)}
/> */
}
{
  /* <Loading isLoading={isLoading}>
  <TrackList uri={data?.uri} tracks={trackFilter(data?.tracks, search)} />
</Loading> */
}
