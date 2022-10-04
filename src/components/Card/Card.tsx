import { FC, PropsWithChildren } from "react";
import { PlayIcon } from "../Icons";
import PlayClearIcon from "../Icons/PlayClearIcon";
import "./Card.css";

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
  subTitle: string;
  img: string;
}

export const CategoryCard: FC<ICategoryCard> = ({
  title,
  subTitle,
  img: imgSrc,
}) => {
  return (
    <article className="card-container">
      <img className="card-img" src={imgSrc} />
      <p className="card-title">{title}</p>
      <p className="card-subtitle">{subTitle}</p>
    </article>
  );
};

interface ISearchCard {
  title: string;
  subTitle: string;
  img: string;
}
export const SearchCard: FC<ISearchCard> = ({
  title,
  subTitle,
  img: imgSrc,
}) => {
  return (
    <Card
      onClick={() => {
        console.log("navigate to artist page");
      }}
    >
      <>
        <div className="card-img-container">
          <img className="card-img" src={imgSrc} />
          <div
            className="card-play-container"
            onClick={(e) => {
              e.stopPropagation();
              console.log("play artist first song");
            }}
          >
            <PlayClearIcon color="#0D0D0D" size="20" />
          </div>
        </div>
        <p className="card-title">{title}</p>
        <p className="card-subtitle">{subTitle}</p>
      </>
    </Card>
  );
};
export default Card;
