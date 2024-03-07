import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { clearCredentials, refreshCredentials } from "../auth/authSlice";

import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { Error404NoPremium } from "../../Notifications";
import { Mutex } from "async-mutex";
import { RootState } from "../../app/store";
import { error as errorNotification } from "../../components/Notification/Notify";

const baseUrl = `https://api.spotify.com/v1/`;
const baseUrlServer = process.env.REACT_APP_SERVER;
// const baseUrlServer = `http://localhost:3001/`;
// const baseUrlServer = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/spotify/`;

const REFRESHTOKEN = 401;
const NOPREMIUM = 403;
const NODEVICE = 404;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryServer = fetchBaseQuery({ baseUrl: baseUrlServer });

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  const errorData = (result.error?.data as any)?.error;

  if (result.error?.status === NOPREMIUM) {
    if (errorData.reason === "PREMIUM_REQUIRED") {
      handleNoPremium(errorData);
    }
  }
  if (result.error?.status === NODEVICE) {
    if (errorData.reason === "NO_ACTIVE_DEVICE") {
      const deviceResult = await handleNoDeviceFound(
        baseQuery,
        api,
        extraOptions
      );

      if (!deviceResult?.error) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        // api.dispatch(logout());
        window.location.href = "/login";
        // console.log("REDIRECT TO LOGIN PAGE");
      }
    }
  }

  if (result.error?.status === REFRESHTOKEN) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const state: any = api.getState();
        const { refreshToken } = state.auth;

        console.log("ASK REFRESH");
        const refreshResult = await baseQueryServer(
          { url: "refresh", method: "POST", body: { refreshToken } },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          api.dispatch(refreshCredentials(refreshResult?.data as any));
          // console.log("RETRY QUERY AFTER REFRESH TOKEN");
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("TOKEN: REDIRECT TO LOGIN PAGE");
          api.dispatch(clearCredentials());
          window.location.href = "/login";
          // window.location.reload();
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const handleNoDeviceFound = async (
  baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const state: any = api.getState();
  const { deviceId } = state.auth;

  try {
    const transferResult = await baseQuery(
      {
        url: "/me/player",
        method: "PUT",
        body: {
          play: false,
          device_ids: [deviceId],
        },
      },
      api,
      extraOptions
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return transferResult;
  } catch (e) {
    console.log("transfer error , refresh page !!!!");
  }
};

const handleNoPremium = (errorData: any) => {
  errorNotification(Error404NoPremium(errorData), true);
};

export default customFetchBase;
