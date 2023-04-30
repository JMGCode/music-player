import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { serverApiSlice } from "../features/api/serverAPI";
import { AppDispatch } from "./store";
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action.type.includes("spotifyApi")) {
      const status = action.meta?.baseQueryMeta?.response.status;
      console.log("status spotify:", status);

      switch (status) {
        case 401:
          console.log("refreshToken");
          serverApiSlice.endpoints.refreshToken.initiate("");
          break;
        case 403:
          console.log("logout");
          break;
        case 429:
          console.log("Rate Limit, sorry");
          break;
      }
    }

    return next(action);
  };
