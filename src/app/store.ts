import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { spotifyApiSlice } from "../features/api/spotify/spotifySlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [spotifyApiSlice.reducerPath]: spotifyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(spotifyApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
