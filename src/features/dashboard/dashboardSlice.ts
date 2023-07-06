//Payload is a typescript type that represents the contents of one given action object
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SpotifyImg = {
  height: number;
  size: string | number;
  url: string;
  width: number;
};

type SpotifyAlbum = {
  name: string;
  uri: string;
  images: SpotifyImg[];
};

type SpotifyArtist = {
  name: string;
  uri: string;
  url: string;
};

export interface ISpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  duration_ms: number;
  id: string;
  is_playable: boolean;
  name: string;
  uid: string;
  uri: string;
  context: any;
}

interface IDashboard {
  isPaused: boolean;
  currTrack: ISpotifyTrack | undefined;
  loopState: { id: number; type: string };
  shuffleState: boolean;
  trackPosition: number;
  trackDuration: number;
  isDeviceActive: boolean;
}

const initialState: IDashboard = {
  isPaused: true,
  currTrack: undefined,
  loopState: { id: 0, type: "" },
  shuffleState: false,
  trackDuration: 0,
  trackPosition: 0,
  isDeviceActive: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPlayingTrack(state, action: PayloadAction<ISpotifyTrack>) {
      state.currTrack = action.payload;
    },
    setIsPlayerPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    setPlayerLoopState(state, action: PayloadAction<number>) {
      const values = ["off", "context", "track"];
      const id = action.payload;
      state.loopState = { id, type: values[id] };
    },
    setPlayerShuffleState(state, action: PayloadAction<boolean>) {
      state.shuffleState = action.payload;
    },
    setPlayerTrackPosition(state, action: PayloadAction<number>) {
      state.trackPosition = action.payload;
    },
    setPlayerTrackDuration(state, action: PayloadAction<number>) {
      state.trackDuration = action.payload;
    },
    setIsDeviceActive(state, action: PayloadAction<boolean>) {
      state.isDeviceActive = action.payload;
    },
  },
});

export const {
  setPlayingTrack,
  setIsPlayerPaused,
  setPlayerLoopState,
  setPlayerShuffleState,
  setPlayerTrackDuration,
  setPlayerTrackPosition,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
