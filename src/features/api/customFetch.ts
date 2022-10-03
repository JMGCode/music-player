import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { RootState } from "../../app/store";

const baseUrl = `https://api.spotify.com/v1/`;
// const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/`;

// Create a new mutex
// const mutex = new Mutex();

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

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  // await mutex.waitForUnlock();

  console.log("QUERY BEFORE EVERYTHING");
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 404) {
    if ((result.error?.data as any)?.error.reason === "NO_ACTIVE_DEVICE") {
      const deviceResult = await handleNoDeviceFound(
        baseQuery,
        api,
        extraOptions
      );

      if (!deviceResult?.error) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        // api.dispatch(logout());
        // window.location.href = "/login";
        console.log("REDIRECT TO LOGIN PAGE");
      }
    }
  }
  if ((result.error?.data as any)?.message === "You are not logged in") {
    // if (!mutex.isLocked()) {
    // const release = await mutex.acquire();

    try {
      console.log("REFRESH TOKEN ON QUERY ERROR");
      const refreshResult = await baseQuery(
        { credentials: "include", url: "auth/refresh" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Retry the initial query
        console.log("RETRY QUERY AFTER REFRESH TOKEN");
        result = await baseQuery(args, api, extraOptions);
      } else {
        // api.dispatch(logout());
        // window.location.href = "/login";
        console.log("REDIRECT TO LOGIN PAGE");
      }
    } finally {
      // release must be called once the mutex should be released again.
      // release();
    }
    // }
    //  else {
    //   // wait until the mutex is available without locking it
    //   await mutex.waitForUnlock();
    //   result = await baseQuery(args, api, extraOptions);
    // }
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
    console.log("transfer reusl", transferResult);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return transferResult;
  } catch (e) {
    console.log("transfer error , refresh page !!!!");
  }
};

export default customFetchBase;
