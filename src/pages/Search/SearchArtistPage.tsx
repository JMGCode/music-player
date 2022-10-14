import { SearchCard } from "../../components/Card/Card";
import { TrackTable } from "../../components";
import { useParams } from "react-router-dom";
import { useSearchQuery } from "../../features/api/spotify";

const SearchArtistPage = () => {
  const { searchQueryType, searchQuery = "" } = useParams();
  const { data, isLoading } = useSearchQuery(
    {
      types: [searchQueryType?.slice(0, -1) || ""],
      query: searchQuery,
    },
    { skip: !searchQuery }
  );

  return searchQueryType !== "tracks" ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
        gap: "20px",
        padding: "40px 0",
      }}
    >
      {/* @ts-ignore */}
      {data?.[searchQueryType]?.items.map((element) => {
        let subtitle = "";
        if (searchQueryType === "albums") {
          const artistName = element.artists[0].name;
          const year = element.release_date.split("-")[0];

          subtitle = `${year} • ${artistName}` || "Album";
        } else if (searchQueryType === "shows") {
          subtitle = element?.publisher || "Podcast";
        } else {
          subtitle = "Artist";
        }

        return (
          <SearchCard
            title={element.name}
            subTitle={subtitle}
            img={element.images[1]?.url || ""}
            onClickPlay={function (): void {
              throw new Error("Function not implemented.");
            }}
            onClickCard={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      })}
    </div>
  ) : (
    //@ts-ignore
    <div>{data?.tracks && <TrackTable tracks={data?.tracks.items} />}</div>
  );
};

export default SearchArtistPage;
