import "./MainResultCard.css";

import React, { useState } from "react";

import { FC } from "react";
import { PlayerButton } from "../../PlayerButton";

type MainType = {
  title: string;
  subtitle: string;
  image: string;
  type: string;
};

interface Props {
  data: any;
}
const MainResultCard: FC<Props> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const title = data?.name;
  const subtitle =
    data?.type === "artist"
      ? data?.name
      : data?.type === "show"
      ? data?.publisher
      : data?.artists[0]?.name;

  const type =
    data?.type === "show"
      ? "PODCAST"
      : data?.type === "track"
      ? "SONG"
      : data?.type.toUpperCase();

  const image =
    data?.type === "track" ? data?.album.images[1].url : data?.images[1].url;

  return (
    <article
      className="card-container"
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img style={{ width: "40%", aspectRatio: "1" }} src={image} alt="" />
      <div>
        <h4 style={{ fontSize: "2rem", marginBottom: "15px" }}>{title}</h4>
        <h6>
          {subtitle}{" "}
          <span
            style={{
              backgroundColor: "#131313",
              padding: "0.3rem 0.6rem",
              borderRadius: "1rem",
              margin: "0 10px",
            }}
          >
            {type}
          </span>
        </h6>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: `${isHover ? "20px" : "0px"}`,
          right: "20px",
          width: "50px",
          height: "50px",
          opacity: `${isHover ? 1 : 0}`,
          transition: "bottom 500ms , opacity 300ms",
        }}
      >
        <PlayerButton onClick={() => {}} state="paused" />
      </div>
    </article>
  );
};

export default MainResultCard;

// title={principal?.name}
//             subtitle={`${
//               principal?.type === "artist"
//                 ? principal?.name
//                 : principal?.type === "show"
//                 ? principal?.publisher
//                 : principal?.artists[0].name
//             }`}
//             type={`${
//               principal?.type === "show"
//                 ? "PODCAST"
//                 : principal?.type === "track"
//                 ? "SONG"
//                 : principal?.type.toUpperCase()
//             }`}
//             image={`${
//               principal?.type === "track"
//                 ? principal?.album.images[1].url
//                 : principal?.images[1].url
//             }`}
