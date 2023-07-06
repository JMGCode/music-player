import "./SearchCard.css";

import Card from "../Card";
import { FC } from "react";
import Img404 from "../../../images/Img404.png";
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
  isPlaying?: boolean;
  noPlay?: boolean;
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
  isPlaying = false,
  noPlay = false,
}) => {
  return (
    <Card
      onClick={() => {
        onClickCard();
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
          {!noPlay && (
            <div
              className="card-play-container"
              onClick={(e) => {
                e.stopPropagation();
                onClickPlay && onClickPlay();
              }}
            >
              <PlayerButton
                width="55px"
                height="55px"
                state={isPlaying ? "playing" : "paused"}
              />
            </div>
          )}
        </div>
        <p className="card-title">{title}</p>
        <p className="card-subtitle">{subTitle}</p>
      </>
    </Card>
  );
};

export default SearchCard;
