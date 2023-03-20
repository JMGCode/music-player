import "./HomePage.css";

import {
  useGetFollowedArtistsQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
} from "../../features/api/spotify/me";

import { SearchCard } from "../../components/Card";
import { useGetRecentlyPlayedQuery } from "../../features/api/spotify";
import { CardSection } from "../../Layout/Container/Section";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { SectionList } from "../../Layout/Container/SectionList";

const HomePage = () => {
  const { data: followedArtists, isLoading: isFollowedArtistLoading } =
    useGetFollowedArtistsQuery();
  const { data: topArtists, isLoading: isLoadingTopArtists } =
    useGetTopArtistsQuery();
  const { data: topTracks, isLoading: isLoadingTopTracks } =
    useGetTopTracksQuery();
  const { data: recentPlayed, isLoading: isRecentPlayedLoading } =
    useGetRecentlyPlayedQuery();

  return (
    <div style={{ paddingBottom: "40px" }}>
      <ScrollHeader height={0} />
      <br></br>
      <ScrollHeaderContent>
        <SectionList style={{ marginTop: "0px" }}>
          <CardSection
            title="Recently Played"
            type="noWrap"
            isLoading={isRecentPlayedLoading}
            items={recentPlayed?.items}
          >
            {recentPlayed?.items.map((item: any) => {
              const { track } = item;
              const artist = track.artists[0];
              const album = track.album;

              return (
                <SearchCard
                  type={track.type}
                  id={track.id}
                  key={`search-card-recent-played/${track.id}`}
                  title={track.name}
                  subTitle={artist.name}
                  img={album?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", track);
                  }}
                  tempToPlay={track}
                />
              );
            })}
          </CardSection>

          <CardSection
            title="Followed Artist"
            type="noWrap"
            isLoading={isFollowedArtistLoading}
            items={followedArtists?.artists?.items}
            isImgCircle
          >
            {followedArtists?.artists.items.map((artist: any) => {
              return (
                <SearchCard
                  type={artist.type}
                  id={artist.id}
                  key={`home-card--followed-artist/${artist.id}`}
                  title={artist.name}
                  subTitle={"Artist"}
                  img={artist?.images[1]?.url || ""}
                  isImgCircle={true}
                  onClickCard={() => {
                    console.log("click album", artist);
                  }}
                  tempToPlay={artist}
                />
              );
            })}
          </CardSection>

          <CardSection
            title="Your Top Artist"
            type="noWrap"
            isLoading={isLoadingTopArtists}
            items={topArtists?.items}
            isImgCircle
          >
            {topArtists?.items.map((artist: any) => {
              return (
                <SearchCard
                  type={artist.type}
                  id={artist.id}
                  key={`search-card-album/${artist.id}`}
                  title={artist.name}
                  subTitle={"Artist"}
                  img={artist?.images[1]?.url || ""}
                  isImgCircle={true}
                  onClickCard={() => {
                    console.log("click album", artist);
                  }}
                  tempToPlay={artist}
                />
              );
            })}
          </CardSection>

          <CardSection
            title="Your Top Songs"
            type="noWrap"
            isLoading={isLoadingTopTracks}
            items={topTracks?.items}
          >
            {topTracks?.items.map((track: any) => {
              const artist = track.artists[0];
              const album = track.album;
              return (
                <SearchCard
                  type={track.type}
                  id={track.id}
                  key={`search-card-top-track/${track.id}`}
                  title={track.name}
                  subTitle={artist.name}
                  img={album?.images[1]?.url || ""}
                  onClickCard={() => {
                    console.log("click album", track.name);
                  }}
                  tempToPlay={track}
                />
              );
            })}
          </CardSection>
        </SectionList>
      </ScrollHeaderContent>
    </div>
  );
};

export default HomePage;
