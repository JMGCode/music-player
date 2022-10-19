import { CategoryCard, SearchCard } from "../../components/Card/Card";

import { useGetCategoriesQuery } from "../../features/api/spotify";
import { useNavigate } from "react-router-dom";

const SearchIndexPage = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: " 40px",
      }}
    >
      <div>
        <h3>Recent Searches</h3>
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
        <h3>See All</h3>
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
                  navigate(`section/${category.id}`);
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
