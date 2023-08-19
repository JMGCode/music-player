import "./Library.css";

import { CardSection } from "../../Layout/Container/Section";
import { CollectionCard } from "../../components/Card/CollectionCard";
import PlaylistSearchCard from "../../components/Card/SearchCard/PlaylistSearchCard";
import { SectionList } from "../../Layout/Container/SectionList";
import { useGetLikedTracksQuery } from "../../features/api/spotify/me";
import { useGetPlaylistsQuery } from "../../features/api/spotify";
import { useNavigate } from "react-router-dom";

const LibraryPlaylistsPage = () => {
  const { data: likedTracks, isLoading: isLoadingLikedTracks } =
    useGetLikedTracksQuery();
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const navigate = useNavigate();
  return (
    <SectionList style={{ padding: "0 30px" }}>
      <CardSection
        title="Playlists"
        type="wrap"
        isLoading={isLoadingPlaylists}
        //@ts-ignore
        items={playlists}
      >
        <div className="collection-contianer">
          <CollectionCard
            collection={likedTracks}
            title="Liked Songs"
            onClick={() => {
              navigate("/collection/tracks");
            }}
            color={"250"}
            countText="liked songs"
          />
        </div>
        {playlists?.map((playlist) => {
          return (
            <PlaylistSearchCard
              key={`playlist-collection-card/${playlist.id}`}
              playlist={playlist}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryPlaylistsPage;
