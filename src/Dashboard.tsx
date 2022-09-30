import "./Dashboard.css";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { Content, Footer, Layout, Sider } from "./Layout";
import { PlaylistList, Player } from "./components";

import TempComponent from "./TempComponent";
import { refreshCredentials } from "./features/auth/authSlice";
import { useRefreshTokenMutation } from "./features/api/serverAPI";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [refreshTokenMutation] = useRefreshTokenMutation();

  useEffect(() => {
    const callRefresh = async (refreshToken: string) => {
      const payload = await refreshTokenMutation(refreshToken).unwrap();
      dispatch(refreshCredentials(payload));
    };

    const { refreshToken } = authState;
    callRefresh(refreshToken);

    const intervalId = setInterval(async () => {
      callRefresh(refreshToken);
    }, 60 * 15 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, refreshTokenMutation]);

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
