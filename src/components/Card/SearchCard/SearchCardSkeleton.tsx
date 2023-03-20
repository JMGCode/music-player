import { FC } from "react";
import Skeleton from "../../Skeleton/Skeleton";

interface IProps {
  isImgCircle: boolean;
}
const SearchCardSkeleton: FC<IProps> = ({ isImgCircle }) => {
  return (
    <article className="card-container" style={{ gap: "12px" }}>
      <Skeleton
        style={{
          width: "100%",
          aspectRatio: `${isImgCircle ? "1" : "0.98"}`,
          borderRadius: `${isImgCircle ? "50%" : "5px"}`,
        }}
      />
      <Skeleton
        style={{ height: "1.2rem", width: "90%", borderRadius: "1rem" }}
      />
      <Skeleton
        style={{ width: "80%", height: "1.2rem", borderRadius: "1rem" }}
      />
    </article>
  );
};

export default SearchCardSkeleton;
