import "./Playlist.css";

import Playlist from "./Playlist";

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
