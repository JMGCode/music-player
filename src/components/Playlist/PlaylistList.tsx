import "./Playlist.css";

import Playlist from "./Playlist";
import Skeleton from "../Skeleton/Skeleton";
import { useGetPlaylistsQuery } from "../../features/api/spotify";
import { useNavigate } from "react-router-dom";

interface IPlaylistList {
  title: string;
}

const PlaylistList: React.FC<IPlaylistList> = ({ title }) => {
  const { data: playlists = [], isLoading } = useGetPlaylistsQuery();
  let navigate = useNavigate();
  if (isLoading) {
    const arr = new Array(20).fill(0);
    const res = arr.map((_, index: number) => {
      return (
        <Skeleton
          key={index}
          style={{ height: "1rem", margin: "8px", borderRadius: "0.4rem" }}
        />
      );
    });
    return (
      <div
        className="playlist playlist__scroll "
        style={{ paddingRight: "15px" }}
      >
        {res}
      </div>
    );
  }

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
