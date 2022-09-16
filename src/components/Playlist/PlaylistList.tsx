import "./Playlist.css";

import Playlist from "./Playlist";
import { useGetPlaylistsQuery } from "../../features/api/spotify";
import { useNavigate } from "react-router-dom";

interface IPlaylistList {
  title: string;
}

const PlaylistList: React.FC<IPlaylistList> = ({ title }) => {
  const { data: playlists = [] } = useGetPlaylistsQuery();
  let navigate = useNavigate();
  return (
    <div className="playlist playlist__scroll ">
      {playlists.map((playlist) => (
        <Playlist
          name={playlist.name}
          key={playlist.trackUri}
          onClick={() => {
            navigate(`/playlist/${playlist.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default PlaylistList;
