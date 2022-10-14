import { CategoryCard, SearchCard } from "../../components/Card/Card";

import { useGetCategoriesQuery } from "../../features/api/spotify";

const SearchIndexPage = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  return (
    <>
      <div>
        <h2>Recent Searches</h2>
        <div
          className="search-recents-container"
          style={{
            display: "flex",
            overflowX: "scroll",
            gap: "30px",
          }}
        >
          <SearchCard
            title="System of a Down down down down"
            subTitle="Artists"
            img="https://crazyminds.es/wp-content/uploads/SYSTEM-OF-A-DOWN-2020.jpg"
            onClickCard={() => {
              console.log("click index card");
            }}
            onClickPlay={() => {
              console.log("play index card");
            }}
          />
        </div>
      </div>
      <div>
        <h2>See All</h2>
        <div
          className="search-categories-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          {categories?.categories.items.map((category: any) => {
            return (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.name}
                img={category.icons[0].url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchIndexPage;
