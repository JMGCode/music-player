import "./ArtistPage.css";

import {
  AlbumGroupType,
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
  useGetArtistsAlbumsQuery,
  useGetArtistsRelatedQuery,
} from "../../features/api/spotify/artist";
import { FC, useEffect, useState } from "react";

import AlbumSearchCard from "../../components/Card/SearchCard/AlbumSearchCard";
import ArtistSearchCard from "../../components/Card/SearchCard/ArtistSearchCard";
import { CardSection } from "../../Layout/Container/Section";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { SectionList } from "../../Layout/Container/SectionList";
import { TrackList } from "../../components";
import { useAppSelector } from "../../app/hooks";
import { useControlPlayerMutation } from "../../features/api/spotify";
import { useGetMeQuery } from "../../features/api/spotify/me";
import { useParams } from "react-router-dom";

const ArtistPage = () => {
  const [controlMutation] = useControlPlayerMutation();
  const [groupType, setGroupType] = useState<AlbumGroupType[]>(["compilation"]);
  const { artistId = "" } = useParams();
  const { data: user } = useGetMeQuery();
  const [isPlaying, setIsPlaying] = useState(false);

  const { isPaused, currTrack: playingTrack } = useAppSelector(
    (state) => state.dashboard
  );

  const { data: artist, isLoading: isLoadingAritst } = useGetArtistQuery(
    artistId,
    { skip: !artistId }
  );

  const { data: topTracks, isLoading: isLoadingTopTracks } =
    useGetArtistTopTracksQuery(
      { artistId, country: user?.country },
      { skip: !artistId || !user?.country }
    );

  const { data: albums, isLoading: isLoadingAlbums } = useGetArtistsAlbumsQuery(
    { artistId, groups: [...groupType] },
    { skip: !artistId }
  );

  const { data: appersOn, isLoading: isLoadingAppearsOn } =
    useGetArtistsAlbumsQuery(
      { artistId, groups: ["appears_on"] },
      { skip: !artistId }
    );

  const { data: relatedArtists, isLoading: isLoadingRelatedArtists } =
    useGetArtistsRelatedQuery(artistId, { skip: !artistId });

  useEffect(() => {
    if (isPaused) {
      setIsPlaying(false);
    } else {
      //get artists names array
      const names = playingTrack?.artists.map((artist) => artist?.name);
      if (names?.includes(artist?.name)) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [playingTrack]);
  return (
    <>
      <ScrollHeader
        title={artist?.name}
        isPlaying={isPlaying}
        onPlay={() => {
          if (!isPlaying) {
            let args = {};
            const isArtistPlaying = playingTrack?.artists[0].uri === artist.uri;

            if (!isArtistPlaying)
              args = {
                uris: [...topTracks?.tracks.map((track: any) => track.uri)],
              };

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
      >
        <img
          src={artist?.images[0].url}
          alt=""
          className="playlist-header-img"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <div>Artist</div>
          <div className="playlist-name">{artist?.name}</div>
        </div>
      </ScrollHeader>
      {/* ==========Content of the page========== */}
      <ScrollHeaderContent>
        <h2 style={{ marginBottom: "20px" }}>Popular</h2>
        <div style={{ maxWidth: "1200px" }}>
          <TrackList
            tracks={topTracks?.tracks}
            onItemClick={(track) => {
              console.log("artist track: ", track);
            }}
          />
        </div>

        <SectionList>
          <CardSection
            isLoading={isLoadingAlbums}
            items={albums?.items}
            type="noWrap"
            title="Discography"
            extraComponent={<DiscographyControls setGroupType={setGroupType} />}
          >
            {albums?.items?.map((album: any) => {
              return (
                <AlbumSearchCard keyString="search-card-album" album={album} />
              );
            })}
          </CardSection>

          <CardSection
            title="Fans also like"
            type="noWrap"
            isLoading={isLoadingRelatedArtists}
            items={relatedArtists?.artists}
          >
            {relatedArtists?.artists?.map((artist: any) => {
              return (
                <ArtistSearchCard
                  keyString="search-card-album"
                  artist={artist}
                />
              );
            })}
          </CardSection>

          <CardSection
            title="Appears On"
            type="noWrap"
            isLoading={isLoadingAppearsOn}
            items={appersOn?.items}
          >
            {appersOn?.items?.map((album: any) => {
              return (
                <AlbumSearchCard keyString="search-card-album" album={album} />
              );
            })}
          </CardSection>
        </SectionList>
      </ScrollHeaderContent>
    </>
  );
};

export default ArtistPage;

interface ControlProps {
  setGroupType: any;
}
const DiscographyControls: FC<ControlProps> = ({ setGroupType }) => {
  return (
    <ul
      onClick={(e) => {
        const index = Array.from(e.currentTarget.children).indexOf(
          e.target as Element
        );

        const group: AlbumGroupType[] = ["compilation", "album", "single"];
        setGroupType([group[index]]);
      }}
      style={{ display: "flex", gap: "16px", listStyle: "none" }}
    >
      <li
        style={{
          backgroundColor: "white",
          padding: "0.5em 1em",
          borderRadius: "16em",
          color: "black",
        }}
      >
        Popular releases
      </li>
      <li
        style={{
          backgroundColor: "white",
          padding: "0.5em 1em",
          borderRadius: "16em",
          color: "black",
        }}
      >
        Albums
      </li>
      <li
        style={{
          backgroundColor: "white",
          padding: "0.5em 1em",
          borderRadius: "16em",
          color: "black",
        }}
      >
        Singles and EPs
      </li>
    </ul>
  );
};
