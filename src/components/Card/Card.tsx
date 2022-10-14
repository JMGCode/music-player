import "./Card.css";

import { FC, PropsWithChildren } from "react";

import Img404 from "../../assets/Img404.png";
import PlayClearIcon from "../Icons/PlayClearIcon";
import { PlayIcon } from "../Icons";
import { useAppSelector } from "../../app/hooks";

interface IProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  padding?: string;
  onClick?: () => void;
}
const Card: FC<PropsWithChildren<IProps>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <article className="card-container" onClick={onClick} style={{ ...props }}>
      {children}
    </article>
  );
};

interface ICategoryCard extends IProps {
  title: string;
  img: string;
  id: string;
}

export const CategoryCard: FC<ICategoryCard> = ({ title, img: imgSrc, id }) => {
  return (
    <article
      className="card-container"
      onClick={() => console.log("click", id)}
    >
      <p className="card-title">{title}</p>
      <br />
      <img className="card-img" src={imgSrc} />
    </article>
  );
};

interface ISearchCard {
  title: string;
  subTitle: string;
  img: string;
  onClickPlay: () => void;
  onClickCard: () => void;
}
export const SearchCard: FC<ISearchCard> = ({
  title,
  subTitle,
  img: imgSrc,
  onClickCard,
  onClickPlay,
}) => {
  const playingTrack = useAppSelector((state) => state.dashboard.currTrack);

  return (
    <Card onClick={onClickCard}>
      <>
        <div className="card-img-container">
          <img
            className="card-img"
            src={imgSrc}
            onError={(ev) => {
              ev.currentTarget.src = Img404;
            }}
          />
          <div
            className="card-play-container"
            onClick={(e) => {
              e.stopPropagation();
              onClickPlay();
            }}
          >
            {<PlayClearIcon color="#0D0D0D" size="20" />}
          </div>
        </div>
        <p className="card-title">{title}</p>
        <p className="card-subtitle">{subTitle}</p>
      </>
    </Card>
  );
};
export default Card;
