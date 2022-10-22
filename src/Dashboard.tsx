import "./Dashboard.css";

import { Content, Footer, Layout, Sider } from "./Layout";
import { Player, PlaylistList } from "./components";

import { Outlet } from "react-router-dom";
import TempComponent from "./TempComponent";

const Dashboard = () => {
  return (
    <Layout>
      <Sider>
        <TempComponent />
        <PlaylistList title="Playlists" />
      </Sider>

      <Content>
        <Outlet />
      </Content>

      <Footer>
        <Player />
      </Footer>
    </Layout>
  );
};

export default Dashboard;
