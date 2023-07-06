import AlbumSearchCard from "../../components/Card/SearchCard/AlbumSearchCard";
import { CardSection } from "../../Layout/Container/Section";
import { SearchCard } from "../../components/Card";
import { SectionList } from "../../Layout/Container/SectionList";
import { useGetLikedAlbumsQuery } from "../../features/api/spotify/me";

const LibraryAlbumsPage = () => {
  const { data: albums, isLoading } = useGetLikedAlbumsQuery();

  return (
    <SectionList style={{ padding: "0 30px" }}>
      <CardSection
        title="Albums"
        type="wrap"
        isLoading={isLoading}
        items={albums?.items}
        skeletonQuantity={20}
      >
        {albums?.items?.map((item: any) => {
          const { album } = item;

          return (
            <AlbumSearchCard
              keyString="collection-card-playlist"
              album={album}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryAlbumsPage;
