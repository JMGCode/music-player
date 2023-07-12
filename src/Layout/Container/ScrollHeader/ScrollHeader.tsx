import "./ScrollHeader.css";

import React, { FC, useEffect, useState } from "react";

import { Header } from "../../Header";
import { PlayerButton } from "../../../components/PlayerButton";
import { getRandColorFromStr } from "../../../helpers/getRandColorFromStr";
import useObservableIntersection from "../../../hooks/useObservableIntersection";

interface Props {
  onPlay?: () => void;
  isPlaying?: boolean;
  title?: string;
  height?: number;
  children?: React.ReactNode;
  onAlphaChange?: (value: number) => void;
}
const ScrollHeader: FC<Props> = ({
  title,
  height = 324,
  children,
  onPlay,
  isPlaying = false,
  onAlphaChange = () => {},
}) => {
  const [headerTitleVisible, setHeaderTitleVisible] = useState(false);
  const [headerAlpha, setHeaderAlpha] = useState(0);

  const obFn = (entries: any) => {
    const ratio = entries[0].intersectionRatio;
    // console.log("header title visible: ", headerTitleVisible);
    if (ratio <= 0.4) {
      setHeaderAlpha(1);
      onAlphaChange(1);
    } else if (ratio > 0.8) {
      setHeaderAlpha(0);
      onAlphaChange(0);
    } else {
      setHeaderAlpha(1 - ratio);
      onAlphaChange(1 - ratio);
    }

    if (ratio <= 0.4 && !headerTitleVisible) {
      setHeaderTitleVisible(true);
    } else {
      setHeaderTitleVisible(false);
    }
  };

  const obOptions = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  const obs = useObservableIntersection(obFn, obOptions);
  if (obs) {
    const tr = document.querySelector(".playlist-header");
    if (tr) obs?.observe(tr);
  }

  const [backgroundColor, setBackgroundColor] = useState({
    content: "",
    h: 0,
  });

  useEffect(() => {
    if (title) {
      const color = getRandColorFromStr(title);
      const content = `linear-gradient(0deg, #131313 0%, hsla(${color.h},70%,25%,1) 50%, hsla(${color.h},70%,50%,1) 100%)`;
      setBackgroundColor({ content, h: color.h });
    } else {
      const h = 340;
      const content = `linear-gradient(0deg, #131313 0%, hsla(${h},70%,25%,1) 50%, hsla(${h},70%,50%,1) 100%)`;
      setBackgroundColor({ content, h });
    }
  }, [title]);

  return (
    <>
      <Header
        styles={{
          container: {
            backgroundColor: `hsla(${backgroundColor.h},70%,25%,${headerAlpha})`,
            // padding: "0 20px 0 40px",
          },
        }}
      >
        <div
          className={`playlist-scroll-title ${
            headerTitleVisible ? "visiblea" : ""
          }`}
        >
          {headerTitleVisible && title && (
            <PlayerButton
              width="45px"
              height="45px"
              state={!isPlaying ? "paused" : "playing"}
              onClick={onPlay}
            />
          )}

          <span>{title}</span>
        </div>
      </Header>
      <div style={{ height: `${height}px` }}>
        <div
          className="playlist-header"
          style={{
            background: backgroundColor.content,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ScrollHeader;

export const ScrollHeaderContent: FC<{
  children: React.ReactNode;
  noPadding?: boolean;
}> = ({ children, noPadding }) => (
  <div style={{ position: "relative", padding: noPadding ? "0" : "0 30px" }}>
    {children}
  </div>
);
