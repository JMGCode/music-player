import "./Playlist.css";

import { useEffect, useState } from "react";

import Playlist from "./Playlist";
import { useAuthContext } from "../hooks/useAuth";

interface IPlaylistList {
  title: string;
  onSelect: Function;
}
//TODO : Separar componente visual del estado? (ver si es conveniente)
const PlaylistList: React.FC<IPlaylistList> = ({ title, onSelect }) => {
  const { spotifyApi, accessToken } = useAuthContext();

  const [playlists, setPlayLists] = useState<
    { name: string; trackUri: string; id: string }[]
  >([]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi?.getUserPlaylists().then((data) => {
      const d = data.body.items.map((item) => {
        return { name: item.name, trackUri: item.tracks.href, id: item.id };
      });

      setPlayLists(d);
    });
  }, [spotifyApi, accessToken]);

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
