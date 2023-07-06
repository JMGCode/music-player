import {
  useGetLikedEpisodesQuery,
  useGetLikedShowsQuery,
} from "../../features/api/spotify/me";

import { CardSection } from "../../Layout/Container/Section";
import { CollectionCard } from "../../components/Card/CollectionCard";
import { SearchCard } from "../../components/Card";
import { SectionList } from "../../Layout/Container/SectionList";
import ShowSearchCard from "../../components/Card/SearchCard/ShowSearchCard";

const LibraryPodcastsPage = () => {
  const { data: shows, isLoading: isLoadingShows } = useGetLikedShowsQuery();
  const { data: episodes, isLoading: isLoadingEpisodes } =
    useGetLikedEpisodesQuery();
  return (
    <SectionList style={{ padding: "0 30px" }}>
      <CardSection
        title="Podcast"
        type="wrap"
        isLoading={isLoadingShows}
        items={shows?.items}
      >
        <div className="collection-contianer">
          <CollectionCard
            collection={episodes}
            title="Your Episodes"
            onClick={() => {}}
            color={"161"}
            countText="episodes"
          />
        </div>
        {shows?.items?.map((item: any) => {
          const { show } = item;
          return (
            <ShowSearchCard keyString="collection-card-shows" show={show} />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryPodcastsPage;
