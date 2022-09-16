//Payload is a typescript type that represents the contents of one given action object
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

const initialState: IAuthState = {
  accessToken: "",
  expiresIn: 0,
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<IAuthState>) {
      return { ...action.payload };
    },
    refreshCredentials(state, action: PayloadAction<IAuthState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCredentials, refreshCredentials } = authSlice.actions;
export default authSlice.reducer;
