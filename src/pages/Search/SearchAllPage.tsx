import { replacer, reviver } from "../../helpers/stringifyMap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardSection } from "../../Layout/Container/Section";
import { MainResultCard } from "../../components/Card/MainResultCard";
import { SearchCard } from "../../components/Card";
import { SectionList } from "../../Layout/Container/SectionList";
import { TrackList } from "../../components";
import localStorage from "redux-persist/es/storage";
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
      // console.log(album, artist, track, show);

      const aaa = [
        albums.items[0],
        artists.items[0],
        tracks.items[0],
        shows.items[0],
      ];

      let bbb: any[] = [];
      let mmm = -Infinity;
      for (let i = 0; i < aaa.length; i++) {
        const [count, rest] = aaa[i]?.name
          ? countMatchLettersa(searchQuery, aaa[i].name)
          : [0, {}];
        // console.log(searchQuery, aaa[i].name, count, rest);
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

      const albumCount = album ? countMatchLetters(searchQuery, album.name) : 0;
      const artistCount = artist
        ? countMatchLetters(searchQuery, artist.name)
        : 0;
      const trackCount = track ? countMatchLetters(searchQuery, track.name) : 0;
      const showCount = show ? countMatchLetters(searchQuery, show.name) : 0;

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
      // console.log("principal", getPrincipal(data));
      setPrincipal(getPrincipal(data));
    }
  }, [data]);

  const handleSaveLocal = async (dataToSave: any) => {
    /**
     * Rules
     * Can not be repeated, if its in the object √
     * move it to the first position
     * Last go First
     * Max 12 items
     */

    let obj: any = {
      id: dataToSave.id,
      name: dataToSave.name,
      images: dataToSave.images,
      uri: dataToSave.uri,
      type: dataToSave.type,
    };
    switch (dataToSave.type) {
      case "track": {
        const { artists, album } = dataToSave;
        const { images } = album;
        obj = { ...obj, artists, images };
        break;
      }
      case "album": {
        const { release_date, artists } = dataToSave;
        obj = { ...obj, release_date, artists };
        break;
      }
      case "show":
        const { publisher } = dataToSave;
        obj = { ...obj, publisher };
        break;
    }

    const prevDataStr =
      (await localStorage.getItem("recentSearches")) ||
      JSON.stringify(new Map(), replacer);
    const prevData = JSON.parse(prevDataStr, reviver);

    //If the object is present is removed
    if (prevData.has(obj.uri)) {
      prevData.delete(obj.uri);
    } else if (prevData.size >= 12) {
      const firstKey = prevData.keys().next().value;

      prevData.delete(firstKey);
    }
    //New object added
    prevData.set(obj.uri, obj);

    const newDataStr = JSON.stringify(prevData, replacer);
    localStorage.setItem("recentSearches", newDataStr);
  };

  return (
    <div style={{ padding: "0 30px" }}>
      <div className="search-principal-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexBasis: "500px",
          }}
        >
          <h2>Main result</h2>
          <MainResultCard data={principal} />
        </div>
        <div className="search-songs">
          <h2 style={{ marginBottom: "20px" }}>Songs</h2>
          <TrackList
            tracks={tracks}
            onItemClick={(track) => {
              // console.log(track);
              // handleSaveLocal(track);
            }}
          />
        </div>
      </div>

      <SectionList>
        <CardSection
          title="Artists"
          type="noWrap"
          isLoading={isLoading}
          items={data?.artists?.items || []}
        >
          {data?.artists?.items.map((artist) => {
            return (
              <SearchCard
                key={`search-card-artist/${artist.id}`}
                title={artist.name}
                subTitle="Artists"
                img={artist?.images[1]?.url || ""}
                isImgCircle={true}
                type={artist.type}
                id={artist.id}
                onClickCard={() => {
                  console.log("click artist card", artist);
                  handleSaveLocal(artist);
                }}
                // onClickPlay={() => {
                //   console.log("click play artist", artist);
                //   handleSaveLocal(artist);
                // }}
              />
            );
          })}
        </CardSection>

        <CardSection
          title="Albums"
          type="noWrap"
          isLoading={isLoading}
          items={data?.albums?.items || []}
        >
          {data?.albums?.items.map((album) => {
            const artistName = album.artists[0].name;
            const year = album.release_date.split("-")[0];

            const subtitle = `${year} • ${artistName}` || "Album";

            return (
              //TODO:Change onClickCard and onClickPlay to be only one function and pass
              //a parameter to know witch one was clicked
              <SearchCard
                key={`search-card-album/${album.id}`}
                title={album.name}
                subTitle={subtitle}
                img={album?.images[1]?.url || ""}
                type={album.type}
                id={album.id}
                onClickCard={() => {
                  console.log("click album", album);
                  handleSaveLocal(album);
                }}
                // onClickPlay={() => {
                //   console.log("play album", album);
                //   handleSaveLocal(album);
                // }}
              />
            );
          })}
        </CardSection>

        <CardSection
          title="Podcast"
          type="noWrap"
          isLoading={isLoading}
          items={data?.shows?.items || []}
        >
          {data?.shows?.items.map((show) => {
            return (
              <SearchCard
                key={`search-card-podcast/${show.id}`}
                title={show.name}
                subTitle={show?.publisher || "Podcast"}
                img={show?.images[1]?.url || ""}
                type={show.type}
                id={show.id}
                onClickCard={() => {
                  console.log("click on show", show);
                  handleSaveLocal(show);
                }}
                // onClickPlay={() => {
                //   console.log("paly show", show);
                //   handleSaveLocal(show);
                // }}
              />
            );
          })}
        </CardSection>
      </SectionList>
    </div>
  );
};

export default SearchAllPage;
