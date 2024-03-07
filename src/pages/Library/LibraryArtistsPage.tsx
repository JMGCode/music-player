import ArtistSearchCard from "../../components/Card/SearchCard/ArtistSearchCard";
import { CardSection } from "../../Layout/Container/Section";
import { SectionList } from "../../Layout/Container/SectionList";
import { useGetFollowedArtistsQuery } from "../../features/api/spotify/me";

const LibraryArtistsPage = () => {
  const { data: artists, isLoading } = useGetFollowedArtistsQuery();

  return (
    <SectionList style={{ padding: "0 30px" }}>
      <CardSection
        title="Artists"
        type="wrap"
        isLoading={isLoading}
        items={artists?.artists?.items}
        isImgCircle
      >
        {artists?.artists?.items?.map((artist: any) => {
          return (
            <ArtistSearchCard
              key={`artist-collection-card/${artist.id}`}
              artist={artist}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryArtistsPage;
