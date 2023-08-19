import { CategoryCard, SearchCard } from "../../components/Card";
import { replacer, reviver } from "../../helpers/stringifyMap";
import { useEffect, useState } from "react";

import AlbumSearchCard from "../../components/Card/SearchCard/AlbumSearchCard";
import ArtistSearchCard from "../../components/Card/SearchCard/ArtistSearchCard";
import { CardSection } from "../../Layout/Container/Section";
import { CrossIcon } from "../../components/Icons";
import { SectionList } from "../../Layout/Container/SectionList";
import ShowSearchCard from "../../components/Card/SearchCard/ShowSearchCard";
import SongSearchCard from "../../components/Card/SearchCard/SongSearchCard";
import getArrayFromMap from "../../helpers/getArrayFromMap";
import { getSmallestImage } from "../../helpers";
import localStorage from "redux-persist/es/storage";
import reverseMap from "../../helpers/reverseMap";
import { useGetCategoriesQuery } from "../../features/api/spotify";
import { useNavigate } from "react-router-dom";

const SearchIndexPage = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<Array<any>>([]);

  useEffect(() => {
    localStorage.getItem("recentSearches").then((res: any = []) => {
      const jsonRes = JSON.parse(res, reviver);
      if (jsonRes) {
        const arr = getArrayFromMap(reverseMap(jsonRes));
        setRecentSearches(arr);
      }
    });
  }, []);

  const handleDeleteFromLocalStorage = async (key: string) => {
    const currData = await localStorage.getItem("recentSearches");
    if (!currData) return;
    const jsonRes = JSON.parse(currData, reviver);
    jsonRes.delete(key);
    await localStorage.setItem(
      "recentSearches",
      JSON.stringify(jsonRes, replacer)
    );
    const arr = getArrayFromMap(reverseMap(jsonRes));
    setRecentSearches(arr);
  };

  return (
    <SectionList style={{ marginTop: "0px", padding: "0 30px" }}>
      <CardSection
        title="Recent Searches"
        type="noWrap"
        isLoading={false}
        items={recentSearches}
      >
        {recentSearches.map((item: any) => {
          return (
            <>
              <div style={{ position: "relative" }}>
                {item.type === "artist" && (
                  <ArtistSearchCard
                    key={`$recent-artist/${item.id}`}
                    artist={item}
                  />
                )}
                {item.type === "album" && (
                  <AlbumSearchCard
                    key={`recent-album/${item.id}`}
                    album={item}
                  />
                )}
                {item.type === "show" && (
                  <ShowSearchCard key={`recent-show/${item.id}`} show={item} />
                )}
                {item.type === "track" && (
                  <SongSearchCard
                    key={`recent-song/${item.id}`}
                    artist={item.artists[0]}
                    album={item.album}
                    track={item}
                  />
                )}
                <div
                  className="search-card-delete-btn"
                  onClick={() => {
                    handleDeleteFromLocalStorage(item.uri);
                  }}
                >
                  <CrossIcon size="10" />
                </div>
              </div>
            </>
          );
        })}
      </CardSection>

      <CardSection
        title="See All"
        type="wrap"
        isLoading={false}
        items={categories?.categories.items}
      >
        {categories?.categories.items.map((category: any) => {
          return (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.name}
              img={category.icons[0].url}
              onClick={() => {
                navigate(`../genre/${category.id}`);
              }}
            />
          );
        })}
      </CardSection>
    </SectionList>
  );
};

export default SearchIndexPage;
