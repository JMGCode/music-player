import "./HomePage.css";

import {
  useGetFollowedArtistsQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
} from "../../features/api/spotify/me";

import ArtistSearchCard from "../../components/Card/SearchCard/ArtistSearchCard";
import { CardSection } from "../../Layout/Container/Section";
import { ScrollHeader } from "../../Layout/Container/ScrollHeader";
import { ScrollHeaderContent } from "../../Layout/Container/ScrollHeader/ScrollHeader";
import { SectionList } from "../../Layout/Container/SectionList";
import SongSearchCard from "../../components/Card/SearchCard/SongSearchCard";
import { useGetRecentlyPlayedQuery } from "../../features/api/spotify";

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
                <SongSearchCard
                  keyString="search-card-recent-played"
                  album={album}
                  artist={artist}
                  track={track}
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
                <ArtistSearchCard
                  keyString="home-card--followed-artist"
                  artist={artist}
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
                <ArtistSearchCard
                  keyString="search-card-album"
                  artist={artist}
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
                <SongSearchCard
                  keyString="search-card-top-track"
                  album={album}
                  artist={artist}
                  track={track}
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
