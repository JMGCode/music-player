import { SearchCard } from "../../components/Card";
import { useGetLikedAlbumsQuery } from "../../features/api/spotify/me";
import { CardSection } from "../../Layout/Container/Section";
import { SectionList } from "../../Layout/Container/SectionList";

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
          const { artists } = album;
          const artist = artists[0];

          return (
            <SearchCard
              key={`collection-card-playlist/${album.id}`}
              title={album.name}
              subTitle={`${artist.name}`}
              img={album.images[0]?.url || ""}
              type={album.type}
              id={album.id}
              onClickCard={() => {
                console.log("click artist card", album);
              }}
              tempToPlay={album}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryAlbumsPage;
