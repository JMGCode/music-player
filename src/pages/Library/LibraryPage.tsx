import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { FC } from "react";
import { Header } from "../../Layout/Header";

interface ILibraryTab {
  title: string;
  route: string;
}
const LibraryTab: FC<ILibraryTab> = ({ title, route }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const currPath = pathArr[pathArr.length - 1];

  return (
    <div
      style={{
        backgroundColor: `${route === currPath ? "rgba(255,255,255,0.1)" : ""}`,
        padding: "12px 24px",
        borderRadius: "5px",
      }}
      onClick={() => {
        navigate(`/collection/${route}`);
      }}
    >
      {title}
    </div>
  );
};

const routes = [
  {
    title: "Playlist",
    route: "playlists",
  },
  {
    title: "Podcasts",
    route: "shows",
  },
  {
    title: "Artists",
    route: "artists",
  },
  {
    title: "Albums",
    route: "albums",
  },
];
const LibraryPage = () => {
  return (
    <div>
      <Header
        styles={{
          container: {
            padding: "0  40px",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            columnGap: "10px",
          }}
        >
          {routes.map(({ title, route }) => {
            return (
              <LibraryTab
                key={`${title}${route}`}
                title={title}
                route={route}
              />
            );
          })}
        </div>
      </Header>
      <Outlet />
    </div>
  );
};

export default LibraryPage;
