import "./GenrePage.css";

import { Header } from "../../Layout/Header";
import { SearchCard } from "../../components/Card";
import {
  useGetCategoryPlaylistQuery,
  useGetCategoryQuery,
} from "../../features/api/spotify";
import { useParams } from "react-router-dom";
import { SectionList } from "../../Layout/Container/SectionList";
import { CardSection } from "../../Layout/Container/Section";

const GenrePage = () => {
  const { genreId = "" } = useParams();
  const { data, isLoading } = useGetCategoryPlaylistQuery(
    { categoryId: genreId },
    {
      skip: genreId === "",
    }
  );

  const { data: category } = useGetCategoryQuery(genreId, {
    skip: genreId === "",
  });

  return (
    <>
      <Header
        styles={{
          container: {
            padding: "0  30px",
          },
        }}
      ></Header>

      <SectionList style={{ padding: "0 30px", marginTop: "0px" }}>
        <CardSection
          title={category?.name || "Genre"}
          type="wrap"
          isLoading={isLoading}
          items={data?.playlists.items}
          skeletonQuantity={20}
        >
          {data?.playlists.items.map((element: any) => {
            return (
              <SearchCard
                title={element.name}
                subTitle={element.description}
                type={element.type}
                id={element.id}
                img={element.images[0]?.url || ""}
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
    </>
  );
};

export default GenrePage;
