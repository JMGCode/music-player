import {
  setIsPlayerPaused,
  setPlayerLoopState,
  setPlayerShuffleState,
  setPlayingTrack,
} from "../features/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";

import { setDeviceId } from "../features/auth/authSlice";

const useSpotifySdk = () => {
  const [playerInstance, setPlayerInstance] = useState<any>();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  const loadSpotifyScript = () => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    const isPresent = document.querySelector('script[src*="spotify"]');
    if (!isPresent) {
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    loadSpotifyScript();
    //@ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      //@ts-ignore
      const player = new window.Spotify.Player({
        name: "JMGCode - Player",
        getOAuthToken: (cb: any) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }: any) => {
        console.log("player ready with id ", device_id);
        dispatch(setDeviceId(device_id));
      });
      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.on("authentication_error", ({ message }: { message: string }) => {
        console.error("Failed to authenticate", message);
      });
      player.on("account_error", ({ message }: { message: string }) => {
        console.error("Failed to validate Spotify account", message);
      });

      player.on("playback_error", ({ message }: { message: string }) => {
        console.error("Failed to perform playback", message);
      });

      player.addListener("player_state_changed", (state: any) => {
        if (!state) {
          return;
        }
        console.log("playerSDKState: ", state);
        dispatch(setPlayingTrack(state.track_window.current_track));
        dispatch(setIsPlayerPaused(state.paused));
        dispatch(setPlayerLoopState(state.repeat_mode));
        dispatch(setPlayerShuffleState(state.shuffle));
      });

      player.connect();
      setPlayerInstance(player);
    };

    return () => playerInstance?.disconnect();
  }, [accessToken, playerInstance, dispatch]);

  return playerInstance;
};
export default useSpotifySdk;
