import { CollectionCard } from "../../components/Card/CollectionCard";
import { SearchCard } from "../../components/Card";
import { useGetLikedTracksQuery } from "../../features/api/spotify/me";
import { useGetPlaylistsQuery } from "../../features/api/spotify";
import { SectionList } from "../../Layout/Container/SectionList";
import { CardSection } from "../../Layout/Container/Section";

const LibraryPlaylistsPage = () => {
  const { data: likedTracks, isLoading: isLoadingLikedTracks } =
    useGetLikedTracksQuery();
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();

  return (
    <SectionList style={{ padding: "0 30px" }}>
      <CardSection
        title="Playlists"
        type="wrap"
        isLoading={isLoadingPlaylists}
        //@ts-ignore
        items={playlists}
      >
        <div style={{ gridColumn: "span 2" }}>
          <CollectionCard
            collection={likedTracks}
            title="Liked Songs"
            onClick={() => {}}
            color={"250"}
            countText="liked songs"
          />
        </div>
        {playlists?.map((playlist) => {
          return (
            <SearchCard
              key={`collection-card-playlist/${playlist.id}`}
              title={playlist.name}
              subTitle={`By ${playlist.ownerName}`}
              type={"playlist"}
              id={playlist.id}
              img={playlist.images[0]?.url || ""}
              onClickCard={() => {
                console.log("click artist card", playlist);
              }}
              tempToPlay={[playlist]}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryPlaylistsPage;
