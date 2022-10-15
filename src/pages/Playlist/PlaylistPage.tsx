import "./PlaylistPage.css";

import { Loading, Search, TrackList, TrackTable } from "../../components";
import { useEffect, useState } from "react";

import { Header } from "../../Layout/Header";
import { ISpotifyTrack } from "../../features/dashboard/dashboardSlice";
import { PlayIcon } from "../../components/Icons";
import { getRandColorFromStr } from "../../helpers/getRandColorFromStr";
import { getTimeFromSec } from "../../helpers";
import useDebounce from "../../hooks/useDebounce";
import { useGetPlaylistTracksQuery } from "../../features/api/spotify";
import useObservableIntersection from "../../hooks/useObservableIntersection";
import { useParams } from "react-router-dom";

const PlaylistPage = () => {
  const [search, setSearch] = useState("");
  const { playlistId = "" } = useParams();
  const { data, isLoading } = useGetPlaylistTracksQuery(playlistId, {
    skip: playlistId === "",
  });

  const [primaryColor, setPrimaryColor] = useState({
    red: 0,
    green: 0,
    blue: 0,
    h: 0,
  });

  useEffect(() => {
    if (data) {
      const color = getRandColorFromStr(data.name);
      setPrimaryColor(color);
    }
  }, [data]);

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

  const [headerTitleVisible, setHeaderTitleVisible] = useState(false);
  const [headerAlpha, setHeaderAlpha] = useState(0);

  const obFn = (entries: any) => {
    const ratio = entries[0].intersectionRatio;

    if (ratio <= 0.4) {
      setHeaderAlpha(1);
    } else if (ratio > 0.8) {
      setHeaderAlpha(0);
    } else {
      setHeaderAlpha(1 - ratio);
    }

    if (ratio <= 0.4 && !headerTitleVisible) {
      setHeaderTitleVisible(true);
    } else {
      setHeaderTitleVisible(false);
    }
  };

  const obOptions = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const obs = useObservableIntersection(obFn, obOptions);
  if (obs) {
    const tr = document.querySelector(".playlist-header");
    if (tr) obs?.observe(tr);
  }

  const { h } = primaryColor;
  return (
    <div style={{ position: "relative" }}>
      <Header
        styles={{
          container: {
            backgroundColor: `hsla(${h},70%,25%,${headerAlpha})`,
            padding: "0 20px 0 40px",
          },
        }}
      >
        <div
          className={`playlist-scroll-title ${
            headerTitleVisible ? "visiblea" : ""
          }`}
        >
          <PlayIcon
            size="50"
            color={headerTitleVisible ? "#56bd40" : "rgba(0, 0, 0, 0.00)"}
          />
          <span>{data?.name}</span>
        </div>
      </Header>

      <div
        className="playlist-header"
        style={{
          background: `linear-gradient(0deg, #131313 0%, hsla(${h},70%,25%,1) 50%, hsla(${h},70%,50%,1) 100%)`,
        }}
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
      </div>

      <TrackTable
        headerColor={`rgba(23,23,23,${headerAlpha})`}
        uri={data?.uri}
        tracks={trackFilter(data?.tracks, search)}
      />
    </div>
  );
};

export default PlaylistPage;
