import { useEffect, useState } from "react";
import {
  useGetFollowedArtistsQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
} from "../../features/api/spotify/me";

import { Header } from "../../Layout/Header";
import { PlayIcon } from "../../components/Icons";
import { SearchCard } from "../../components/Card/Card";
import { getRandColorFromStr } from "../../helpers/getRandColorFromStr";
import { useGetRecentlyPlayedQuery } from "../../features/api/spotify";
import useObservableIntersection from "../../hooks/useObservableIntersection";

const HomePage = () => {
  const [headerTitleVisible, setHeaderTitleVisible] = useState(false);
  const [headerAlpha, setHeaderAlpha] = useState(1);
  const [primaryColor, setPrimaryColor] = useState({
    red: 0,
    green: 0,
    blue: 0,
    h: 0,
  });

  useEffect(() => {
    console.log("get color from datetime.....");
    setPrimaryColor((prev) => ({ ...prev, h: 340 }));
  }, []);

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

  const { data: followedArtists } = useGetFollowedArtistsQuery();
  const { data: topArtists } = useGetTopArtistsQuery();
  const { data: topTracks } = useGetTopTracksQuery();
  const { data: recentPlayed } = useGetRecentlyPlayedQuery();

  console.log("followed artists", followedArtists);
  console.log("top artists", topArtists);
  console.log("top tracks", topTracks);
  console.log("recent played", recentPlayed);

  return (
    <div className="scrollable">
      <Header
        styles={{
          container: {
            backgroundColor: `hsla(${h},70%,25%,${headerAlpha})`,
            padding: "0 20px 0 40px",
          },
        }}
      ></Header>
      <div style={{ height: "0px" }}>
        <div
          className="playlist-header"
          style={{
            padding: "64px 0.7rem 150px 40px",
            background: `linear-gradient(0deg, #131313 0%, hsla(${h},70%,25%,1) 50%, hsla(${h},70%,50%,1) 100%)`,
          }}
        ></div>
      </div>

      <div style={{ position: "relative", padding: "0 40px" }}>
        {recentPlayed && (
          <div className="search-list">
            <h3>Recently played</h3>
            <div className="search-list-container">
              {recentPlayed.items.map((item: any) => {
                const { track } = item;
                const artist = track.artists[0];
                const album = track.album;

                return (
                  <SearchCard
                    key={`search-card-recent-played/${track.id}`}
                    title={track.name}
                    subTitle={artist.name}
                    img={album?.images[1]?.url || ""}
                    onClickCard={() => {
                      console.log("click album", track);
                    }}
                    onClickPlay={() => {
                      console.log("play album", track);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
        <div className="search-list">
          <h3>Followed Artists</h3>
          <div className="search-list-container">
            {followedArtists?.artists.items.map((artist: any) => {
              return (
                <SearchCard
                  key={`search-card-album/${artist.id}`}
                  title={artist.name}
                  subTitle={"Artist"}
                  img={artist?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", artist);
                  }}
                  onClickPlay={() => {
                    console.log("play album", artist);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="search-list">
          <h3>Your Top Artists</h3>
          <div className="search-list-container">
            {topArtists?.items.map((artist: any) => {
              return (
                <SearchCard
                  key={`search-card-album/${artist.id}`}
                  title={artist.name}
                  subTitle={"Artist"}
                  img={artist?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", artist);
                  }}
                  onClickPlay={() => {
                    console.log("play album", artist);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="search-list">
          <h3>Your Top Tracks</h3>
          <div className="search-list-container">
            {topTracks?.items.map((track: any) => {
              const artist = track.artists[0];
              const album = track.album;
              return (
                <SearchCard
                  key={`search-card-top-track/${track.id}`}
                  title={track.name}
                  subTitle={artist.name}
                  img={album?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", track.name);
                  }}
                  onClickPlay={() => {
                    console.log("play album", track.name);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
