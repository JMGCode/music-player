import "./PlaylistPage.css";

import { Loading, Search, TrackList, TrackTable } from "../../components";
import { useEffect, useState } from "react";

import { Header } from "../../Layout/Header";
import { ISpotifyTrack } from "../../features/dashboard/dashboardSlice";
import { PlayIcon } from "../../components/Icons";
import { PlayerButton } from "../../components/PlayerButton";
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

  const [primaryColor, setPrimaryColor] = useState<
    | {
        red: number;
        green: number;
        blue: number;
        h: number;
      }
    | undefined
  >(undefined);

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
    // console.log("header title visible: ", headerTitleVisible);
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

  //===================================================
  const infiniteFn = (entries: any) => {
    const ratio = entries[0].intersectionRatio;
    console.log("infiniteRatio", ratio);
  };
  const infiniteOptions = { threshold: [0.8] };

  const inifiniteObservation = useObservableIntersection(
    infiniteFn,
    infiniteOptions
  );

  if (inifiniteObservation) {
    const infiniteTable = document.querySelector(".track-table-container");
    if (infiniteTable) inifiniteObservation?.observe(infiniteTable);
  }
  //===================================================

  const { h } = primaryColor || {};
  return (
    // <div style={{ position: "relative" }}>
    <div>
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
          {/* <PlayIcon
            size="50"
            color={headerTitleVisible ? "#56bd40" : "rgba(0, 0, 0, 0.00)"}
          /> */}
          {headerTitleVisible && <PlayerButton width="45px" height="45px" />}

          <span className="playlist-header-name">{data?.name}</span>
        </div>
      </Header>

      <div style={{ height: "324px" }}>
        <div
          className="playlist-header"
          style={{
            background: `${
              h
                ? `linear-gradient(0deg, #131313 0%, hsla(${h},70%,25%,1) 50%, hsla(${h},70%,50%,1) 100%)`
                : ""
            }`,
            // background: `linear-gradient(0deg, #131313 0%, hsla(${h},70%,25%,1) 50%, hsla(${h},70%,50%,1) 100%)`,
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
