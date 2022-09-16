import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useGetPlaylistsQuery } from "./features/api/spotify/spotifySlice";

import Content from "./Layout/Content";
import Footer from "./Layout/Footer";
import Layout from "./Layout";
import Lyrics from "./Lyrics/Lyrics";
import Player from "./Player/Player";
import PlaylistList from "./Playlist/PlaylistList";

import Sider from "./Layout/Sider";
import TempComponent from "./TempComponent";
import { refreshCredentials } from "./features/auth/authSlice";
import { useRefreshTokenMutation } from "./features/api/serverAPI/serverSlice";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [refreshTokenMutation] = useRefreshTokenMutation();

  useEffect(() => {
    const { expiresIn, refreshToken } = authState;
    console.log(expiresIn);
    const intervalId = setInterval(async () => {
      const payload = await refreshTokenMutation(refreshToken).unwrap();
      dispatch(refreshCredentials(payload));
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <Sider>
        <TempComponent />
        <PlaylistList title="Playlists" />
      </Sider>

      {/* TODO: Cambiar content location a redux para un manejo mas sencillo */}
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
