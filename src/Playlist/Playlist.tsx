import "./Playlist.css";

import React from "react";

export interface IPlayListItem {
  name: string;
  onClick: Function;
}

const Playlist: React.FC<IPlayListItem> = ({ name, onClick }) => {
  return (
    <div
      className="playlist__item"
      onClick={() => {
        onClick();
      }}
    >
      {name}
    </div>
  );
};

export default Playlist;
