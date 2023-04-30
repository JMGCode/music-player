import "./Dashboard.css";

import { Content, Footer, Layout, Sider } from "./Layout";
import { Player, PlaylistList } from "./components";

import { Outlet } from "react-router-dom";
import PlayerProvider from "./PlayerContext";
import SiderProvider from "./SliderContext";
import TempComponent from "./TempComponent";

const Dashboard = () => {
  return (
    <Layout>
      <SiderProvider>
        <Sider>
          <TempComponent />
          <PlaylistList title="Playlists" />
        </Sider>

        <Content>
          <Outlet />
        </Content>

        <PlayerProvider>
          <Footer>
            <Player />
          </Footer>
        </PlayerProvider>
      </SiderProvider>
    </Layout>
  );
};

export default Dashboard;
