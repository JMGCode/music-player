//Payload is a typescript type that represents the contents of one given action object
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  deviceId?: string;
}

const initialState: IAuthState = {
  accessToken: "",
  expiresIn: 0,
  refreshToken: "",
  deviceId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCredentials() {
      return { accessToken: "", expiresIn: 0, refreshToken: "" };
    },
    setCredentials(state, action: PayloadAction<IAuthState>) {
      return { ...state, ...action.payload };
    },
    refreshCredentials(state, action: PayloadAction<IAuthState>) {
      return { ...state, ...action.payload };
    },
    setDeviceId(state, action: PayloadAction<string>) {
      return { ...state, deviceId: action.payload };
    },
  },
});

export const {
  setCredentials,
  refreshCredentials,
  setDeviceId,
  clearCredentials,
} = authSlice.actions;
export default authSlice.reducer;
