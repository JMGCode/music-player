import { SearchCard } from "../../components/Card";
import { TrackTable } from "../../components";
import { useParams } from "react-router-dom";
import { useSearchQuery } from "../../features/api/spotify";
import { SectionList } from "../../Layout/Container/SectionList";
import { CardSection } from "../../Layout/Container/Section";
import {
  ArtistsItem,
  ShowsItem,
  AlbumElement,
} from "../../features/api/spotify/interfaces/genericSearch";
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
          let subtitle = "";
          let genElem = element as ArtistsItem;
          if (searchQueryType === "albums") {
            const album = element as AlbumElement;
            const artistName = album.artists[0].name;
            const year = album.release_date.split("-")[0];
            subtitle = `${year} • ${artistName}` || "Album";
          } else if (searchQueryType === "shows") {
            const show = element as ShowsItem;
            subtitle = show?.publisher || "Podcast";
          } else {
            subtitle = "Artist";
          }

          return (
            <SearchCard
              title={genElem.name}
              subTitle={subtitle}
              type={genElem.type}
              id={genElem.id}
              img={genElem.images[1]?.url || ""}
              onClickPlay={function (): void {
                throw new Error("Function not implemented.");
              }}
              onClickCard={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
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
