import "./CollectionCard.css";

import React, { useState } from "react";

import { FC } from "react";
import { PlayerButton } from "../../PlayerButton";

interface IProps {
  onClick: () => void;
  color: string;
  title: string;
  countText: string;
  collection: any;
}
const CollectionCard: FC<IProps> = ({
  onClick,
  color,
  title,
  collection,
  countText,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <article
      className="card-container"
      onClick={onClick}
      style={{
        background: `linear-gradient(145deg, hsla(${color},100%,30%,1) 38%, hsla(${color},100%,65%,1) 100%)`,
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <p className="collection-content">
        {collection?.items?.map((item: any) => {
          const { track } = item;
          const { name: trackName, artists } = track;
          const { name: artistName } = artists[0];
          return (
            <>
              <span style={{ color: "rgba(255,255,255,0.8)" }}>
                {artistName}
              </span>
              <span
                style={{
                  fontSize: "0.5rem",
                  padding: "0 5px",
                  lineHeight: "1.8rem",
                }}
              >
                ●
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.5)",
                  paddingRight: "5px",
                }}
              >
                {trackName}
              </span>
            </>
          );
        })}
      </p>
      <h4 style={{ fontSize: "2rem", marginBottom: "15px" }}>{title}</h4>
      <h4 style={{ fontSize: "1.2rem", fontWeight: "lighter" }}>{`${
        collection?.total || 0
      } ${countText}`}</h4>

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

export default CollectionCard;
