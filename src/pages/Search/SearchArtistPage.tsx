import {
  AlbumElement,
  ArtistsItem,
  ShowsItem,
} from "../../features/api/spotify/interfaces/genericSearch";

import AlbumSearchCard from "../../components/Card/SearchCard/AlbumSearchCard";
import ArtistSearchCard from "../../components/Card/SearchCard/ArtistSearchCard";
import { CardSection } from "../../Layout/Container/Section";
import { SectionList } from "../../Layout/Container/SectionList";
import ShowSearchCard from "../../components/Card/SearchCard/ShowSearchCard";
import { TrackTable } from "../../components";
import { useParams } from "react-router-dom";
import { useSearchQuery } from "../../features/api/spotify";

type GenType = "albums" | "artists" | "tracks" | "shows";

const SearchArtistPage = () => {
  const { searchQueryType = "", searchQuery = "" } = useParams();
  const { data, isLoading } = useSearchQuery(
    {
      types: [searchQueryType?.slice(0, -1) || ""],
      query: searchQuery,
    },
    { skip: !searchQuery }
  );

  return searchQueryType !== "tracks" ? (
    <SectionList>
      <CardSection
        title=""
        type="wrap"
        isLoading={isLoading}
        //@ts-ignore
        items={data?.[searchQueryType as GenType]?.items}
      >
        {data?.[searchQueryType as GenType]?.items.map((element) => {
          let genElem = element as ArtistsItem;
          if (searchQueryType === "albums") {
            const album = element as AlbumElement;
            return (
              <AlbumSearchCard
                key={`album-search-card/${album.id}`}
                album={album}
              />
            );
          } else if (searchQueryType === "shows") {
            const show = element as ShowsItem;
            // subtitle = show?.publisher || "Podcast";
            return (
              <ShowSearchCard key={`show-search-card/${show.id}`} show={show} />
            );
          } else {
            return (
              <ArtistSearchCard
                key={`artist-search-card/${genElem.id}`}
                artist={genElem}
              />
            );
          }
        })}
      </CardSection>
    </SectionList>
  ) : (
    //@ts-ignore
    <div>
      {data?.tracks && (
        //@ts-ignore
        <TrackTable tracks={data?.tracks.items} headerTopOffset="109px" />
      )}
    </div>
  );
};

export default SearchArtistPage;
