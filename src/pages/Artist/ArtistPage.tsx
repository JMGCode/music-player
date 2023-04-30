import "./ArtistPage.css";

import { TrackList } from "../../components";
import {
  AlbumGroupType,
  useGetArtistQuery,
  useGetArtistsAlbumsQuery,
  useGetArtistsRelatedQuery,
  useGetArtistTopTracksQuery,
} from "../../features/api/spotify/artist";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useGetMeQuery } from "../../features/api/spotify/me";
import { FC, useEffect, useState } from "react";
import { SearchCard } from "../../components/Card";
import { Header } from "../../Layout/Header";
import useObservableIntersection from "../../hooks/useObservableIntersection";
import { PlayerButton } from "../../components/PlayerButton";
import { getRandColorFromStr } from "../../helpers/getRandColorFromStr";
import { CardSection, Section } from "../../Layout/Container/Section";
import { List } from "../../Layout/Container/List";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { SectionList } from "../../Layout/Container/SectionList";

const ArtistPage = () => {
  const [groupType, setGroupType] = useState<AlbumGroupType[]>(["compilation"]);
  const { artistId = "" } = useParams();
  const { data: user } = useGetMeQuery();

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

  return (
    <>
      <ScrollHeader title={artist?.name}>
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
                <SearchCard
                  type={album.type}
                  id={album.id}
                  key={`search-card-album/${album.id}`}
                  title={album.name}
                  subTitle={"Album"}
                  img={album?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", album);
                  }}
                  tempToPlay={album}
                />
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
                <SearchCard
                  type={artist.type}
                  id={artist.id}
                  key={`search-card-album/${artist.id}`}
                  title={artist.name}
                  isImgCircle={true}
                  subTitle={"Artist"}
                  img={artist?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", artist);
                  }}
                  tempToPlay={artist}
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
            {appersOn?.items?.map((artist: any) => {
              return (
                <SearchCard
                  type={artist.type}
                  id={artist.id}
                  key={`search-card-album/${artist.id}`}
                  title={artist.name}
                  subTitle={"Artist"}
                  img={artist?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", artist);
                  }}
                  tempToPlay={artist}
                />
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
