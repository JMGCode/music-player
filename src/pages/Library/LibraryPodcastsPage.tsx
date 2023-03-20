import {
  useGetLikedEpisodesQuery,
  useGetLikedShowsQuery,
} from "../../features/api/spotify/me";

import { CollectionCard } from "../../components/Card/CollectionCard";
import { SearchCard } from "../../components/Card";
import { SectionList } from "../../Layout/Container/SectionList";
import { CardSection } from "../../Layout/Container/Section";

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
        <div style={{ gridColumn: "span 2" }}>
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
            <SearchCard
              key={`collection-card-shows/${show.id}`}
              id={show.id}
              type={show.type}
              title={show.name}
              subTitle={`By ${show.publisher}`}
              img={show?.images[0]?.url || ""}
              onClickCard={() => {
                console.log("click artist card", show);
              }}
              tempToPlay={[show]}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default LibraryPodcastsPage;
