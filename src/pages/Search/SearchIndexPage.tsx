import { CategoryCard, SearchCard } from "../../components/Card";
import { replacer, reviver } from "../../helpers/stringifyMap";
import { useEffect, useState } from "react";

import { CrossIcon } from "../../components/Icons";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: " 40px",
      }}
    >
      {recentSearches.length > 0 && (
        <div>
          <h2 style={{ marginBottom: "20px" }}>Recent Searches</h2>
          <div className="search-list-container">
            {recentSearches.map((search) => {
              const {
                name,
                images,
                uri,
                type,
                artists,
                release_date,
                publisher,
                id,
              } = search;
              // const image = getSmallestImage(images);
              const image = images[1] ? images[1] : images[0] ? images[0] : "";
              let subTitle = "Artist";

              if (type === "album") {
                // const { artists, release_date } = search;
                const artistName = artists[0].name;
                const year = release_date.split("-")[0];

                subTitle = `${year} • ${artistName}` || "Album";
              }
              if (type === "track") {
                // const { artists } = search;
                subTitle = artists[0].name;
              }

              if (type === "show") {
                subTitle = publisher || "Podcast";
              }
              return (
                <div style={{ position: "relative" }}>
                  <SearchCard
                    title={search.name}
                    subTitle={subTitle}
                    type={type}
                    id={id}
                    img={image.url}
                    onClickCard={() => {
                      console.log("click index card");
                    }}
                    onClickPlay={() => {
                      console.log("play index card");
                    }}
                  />
                  <div
                    className="search-card-delete-btn"
                    onClick={() => {
                      handleDeleteFromLocalStorage(search.uri);
                    }}
                  >
                    <CrossIcon size="10" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <h2 style={{ marginBottom: "20px" }}>See All</h2>
        <div
          // className="search-list-container "
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(215px, 1fr))",
            gap: "30px",
          }}
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
        </div>
      </div>
    </div>
  );
};

export default SearchIndexPage;
