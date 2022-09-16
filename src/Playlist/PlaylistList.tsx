import "./Playlist.css";

import { useEffect, useState } from "react";

import Playlist from "./Playlist";
import { useAppSelector } from "../app/hooks";
import { useAuthContext } from "../hooks/useAuth";
import { useGetMeQuery } from "../features/api/spotify/spotifySlice";

interface IPlaylistList {
  title: string;
  onSelect: Function;
  playlists: { name: string; trackUri: string; id: string }[];
}

const PlaylistList: React.FC<IPlaylistList> = ({
  title,
  onSelect,
  playlists,
}) => {
  return (
    <div className="playlist playlist__scroll ">
      {/* <h1 className="playlist__title">{title}</h1> */}

      {playlists.map((playlist) => (
        <Playlist
          name={playlist.name}
          key={playlist.trackUri}
          onClick={() => {
            onSelect(playlist.id);
          }}
        />
      ))}
    </div>
  );
};

export default PlaylistList;
