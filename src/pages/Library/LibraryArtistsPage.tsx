import { SearchCard } from "../../components/Card";
import { useGetFollowedArtistsQuery } from "../../features/api/spotify/me";
import { CardSection } from "../../Layout/Container/Section";
import { SectionList } from "../../Layout/Container/SectionList";

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
            <SearchCard
              key={`collection-card-artists/${artist.id}`}
              title={artist.name}
              subTitle={`${artist.name}`}
              img={artist.images[0]?.url || ""}
              isImgCircle
              type={artist.type}
              id={artist.id}
              onClickCard={() => {
                console.log("click artist card", artist);
              }}
              tempToPlay={artist}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryArtistsPage;
