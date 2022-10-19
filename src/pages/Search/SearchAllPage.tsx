import { useEffect, useState } from "react";

import PlayClearIcon from "../../components/Icons/PlayClearIcon";
import { SearchCard } from "../../components/Card/Card";
import { TrackList } from "../../components";
import { useParams } from "react-router-dom";
import { useSearchQuery } from "../../features/api/spotify";

const SearchAllPage = () => {
  const { searchQuery = "" } = useParams();
  const [principal, setPrincipal] = useState<any>(undefined);
  const [tracks, setTracks] = useState([]);
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
      console.log(album, artist, track, show);

      const aaa = [
        albums.items[0],
        artists.items[0],
        tracks.items[0],
        shows.items[0],
      ];

      let bbb: any[] = [];
      let mmm = -Infinity;
      for (let i = 0; i < aaa.length; i++) {
        const [count, rest] = countMatchLettersa(searchQuery, aaa[i].name);
        console.log(searchQuery, aaa[i].name, count, rest);
        if (count > mmm) {
          bbb = [aaa[i]];
          mmm = count;
        } else if (count === mmm) {
          bbb.push(aaa[i]);
        }
      }

      const ccc = bbb.reduce((acc, curr) => {
        if (curr.popularity > acc.popularity) {
          acc = curr;
        }
        return acc;
      });

      console.log("bbb: ", bbb);
      console.log("ccc", ccc);

      const albumCount = album ? countMatchLetters(searchQuery, album.name) : 0;
      const artistCount = artist
        ? countMatchLetters(searchQuery, artist.name)
        : 0;
      const trackCount = track ? countMatchLetters(searchQuery, track.name) : 0;
      const showCount = show ? countMatchLetters(searchQuery, show.name) : 0;

      console.log(
        "album",
        albumCount,
        "aritst",
        artistCount,
        "show",
        showCount,
        "track",
        trackCount
      );
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

    const countMatchLettersa = (a: string, b: string) => {
      let count = 0;
      const [shorterStr, largestStr] = a.length > b.length ? [b, a] : [a, b];
      for (let i = 0; i < shorterStr.length; i++) {
        if (a[i].toLowerCase() !== b[i].toLowerCase())
          return [count, largestStr.length - count];
        count++;
      }

      return [count, largestStr.length - count];
    };

    const countMatchLetters = (a: string, b: string) => {
      let count = 0;
      let shorterStr = a.length > b.length ? b : a;
      for (let i = 0; i < shorterStr.length; i++) {
        if (a[i].toLowerCase() !== b[i].toLowerCase()) return count;
        count++;
      }
      return count;
    };

    if (data) {
      setTracks(
        // @ts-ignore
        data?.tracks.items.filter(
          // @ts-ignore
          (item, index: number) => index < 4
        )
      );
      console.log("principal", getPrincipal(data));
      setPrincipal(getPrincipal(data));
    }
  }, [data]);
  return (
    <div style={{padding:"0 40px"}}>
      <div className="search-principal-container">
        <div className="search-principal">
          <h3>Main result</h3>

          <div
            className="card-container"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <img
              style={{ width: "100px", aspectRatio: "1" }}
              src={
                principal?.type === "track"
                  ? principal?.album.images[1].url
                  : principal?.images[1].url
              }
              alt=""
            />
            <div
              className="card-play-container"
              style={{ right: "20px" }}
              onClick={(e) => {
                e.stopPropagation();
                console.log("play artist first song");
              }}
            >
              <PlayClearIcon color="#0D0D0D" size="20" />
            </div>

            <div>
              <h5
                style={{
                  fontSize: "2rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {principal?.name}
              </h5>
              <h6>
                {principal?.type === "artist"
                  ? principal?.name
                  : principal?.type === "show"
                  ? principal?.publisher
                  : principal?.artists[0].name}{" "}
                <span
                  style={{
                    backgroundColor: "#131313",
                    borderRadius: "20px",
                    fontSize: "0.7rem",
                    padding: "6px 12px",
                    marginLeft: "10px",
                  }}
                >
                  {principal?.type === "show"
                    ? "PODCAST"
                    : principal?.type.toUpperCase()}
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div className="search-songs">
          <h3>Songs</h3>
          <TrackList tracks={tracks} />
        </div>
      </div>
      <div className="search-list">
        <h3>Artists</h3>
        <div className="search-list-container">
          {data?.artists?.items.map((artist) => {
            return (
              <SearchCard
                key={`search-card-artist/${artist.id}`}
                title={artist.name}
                subTitle="Artists"
                img={artist?.images[1]?.url || ""}
                onClickCard={() => {
                  console.log("click artist card", artist);
                }}
                onClickPlay={() => {
                  console.log("click play artist", artist);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="search-list">
        <h3>Albums</h3>
        <div className="search-list-container">
          {data?.albums?.items.map((album) => {
            const artistName = album.artists[0].name;
            const year = album.release_date.split("-")[0];

            const subtitle = `${year} • ${artistName}` || "Album";

            return (
              <SearchCard
                key={`search-card-album/${album.id}`}
                title={album.name}
                subTitle={subtitle}
                img={album?.images[1]?.url || ""}
                onClickCard={() => {
                  console.log("click album", album);
                }}
                onClickPlay={() => {
                  console.log("play album", album);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="search-list">
        <h3>Podcasts</h3>
        <div className="search-list-container">
          {data?.shows?.items.map((show) => {
            return (
              <SearchCard
                key={`search-card-podcast/${show.id}`}
                title={show.name}
                subTitle={show?.publisher || "Podcast"}
                img={show?.images[1]?.url || ""}
                onClickCard={() => {
                  console.log("click on show", show);
                }}
                onClickPlay={() => {
                  console.log("paly show", show);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchAllPage;
