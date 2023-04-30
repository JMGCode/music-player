import "./SearchCard.css";

import Card from "../Card";
import { FC } from "react";
import Img404 from "../../../assets/Img404.png";
import { PlayerButton } from "../../PlayerButton";
import { useNavigate } from "react-router-dom";

interface ISearchCard {
  title: string;
  subTitle: string;
  img: string;
  isImgCircle?: boolean;
  type: string;
  id: string;
  onClickCard: () => void;
  onClickPlay?: () => void;
  tempToPlay?: any;
}
const SearchCard: FC<ISearchCard> = ({
  title,
  subTitle,
  img: imgSrc,
  isImgCircle = false,
  type,
  id,
  onClickCard,
  onClickPlay,
  tempToPlay,
}) => {
  // const playingTrack = useAppSelector((state) => state.dashboard.currTrack);
  let navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        onClickCard();
        navigate(`/${type}/${id}`);
      }}
    >
      <>
        <div className="card-img-container">
          <img
            className="card-img"
            src={imgSrc}
            onError={(ev) => {
              ev.currentTarget.src = Img404;
            }}
            style={{
              aspectRatio: `${isImgCircle ? "1" : "0.98"}`,
              borderRadius: `${isImgCircle ? "50%" : "5px"}`,
            }}
          />
          <div
            className="card-play-container"
            onClick={(e) => {
              console.log("temp: ", tempToPlay);
              e.stopPropagation();
              onClickPlay && onClickPlay();
            }}
          >
            <PlayerButton width="55px" height="55px" track={tempToPlay} />
          </div>
        </div>
        <p className="card-title">{title}</p>
        <p className="card-subtitle">{subTitle}</p>
      </>
    </Card>
  );
};

export default SearchCard;
