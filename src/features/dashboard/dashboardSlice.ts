//Payload is a typescript type that represents the contents of one given action object
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITrack } from "../../components/Tracks/TrackItem";

interface IDashboard {
  currTrack: ITrack;
}

const initialState: IDashboard = {
  currTrack: {
    artist: "",
    albumUrl: "",
    title: "",
    uri: "",
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPlayingTrack(state, action: PayloadAction<ITrack>) {
      state.currTrack = action.payload;
    },
  },
});

export const { setPlayingTrack } = dashboardSlice.actions;
export default dashboardSlice.reducer;
