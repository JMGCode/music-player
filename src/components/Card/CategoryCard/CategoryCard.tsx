import { FC, useState } from "react";
import { getRandColorFromStr } from "../../../helpers/getRandColorFromStr";
import { PlayerButton } from "../../PlayerButton";

interface IProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  padding?: string;
  onClick?: () => void;
}

interface ICategoryCard extends IProps {
  title: string;
  img: string;
  id: string;
}

const CategoryCard: FC<ICategoryCard> = ({
  title,
  img: imgSrc,
  id,
  onClick,
}) => {
  const { h } = getRandColorFromStr(title);
  return (
    <article
      className="card-container"
      onClick={onClick}
      style={{
        backgroundColor: `hsl(${h},70%,50%)`,
        width: "100%",
        aspectRatio: "1",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <h4 style={{ fontSize: "1.4rem" }}>{title}</h4>

      <img
        style={{
          width: "50%",
          aspectRatio: "1",
          transform: "rotate(25deg)",
          position: "absolute",
          bottom: "0",
          right: "-10%",
        }}
        src={imgSrc}
      />
    </article>
  );
};
export default CategoryCard;
