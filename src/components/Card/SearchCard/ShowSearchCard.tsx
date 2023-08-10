import { FC } from "react";
import SearchCard from "./SearchCard";
import { useNavigate } from "react-router-dom";
interface Props {
  show: any;
  keyString: string;
  onClick?: () => void;
}
const ShowSearchCard: FC<Props> = ({ keyString, show, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const { type, id } = show;
    navigate(`/${type}/${id}`);
    onClick && onClick();
  };

  return (
    <SearchCard
      key={`${keyString}/${show.id}`}
      title={show.name}
      subTitle={show?.publisher || "Podcast"}
      img={show?.images[1]?.url || ""}
      type={show.type}
      id={show.id}
      onClickCard={handleCardClick}
      noPlay
    />
  );
};

export default ShowSearchCard;
