import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface IAPILogin {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
interface IAPIRefreshToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const serverApiSlice = createApi({
  reducerPath: "serverApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER }),
  endpoints: (builder) => ({
    login: builder.mutation<IAPILogin, string>({
      query: (code) => ({
        url: "login",
        method: "POST",
        body: { code },
      }),
    }),
    refreshToken: builder.mutation<IAPIRefreshToken, string>({
      query: (refreshToken) => ({
        url: "refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    getLyrics: builder.query<any, { title: string; artist: string }>({
      query: ({ title, artist }) => `lyrics?title=${title}&artist=${artist}`,
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useGetLyricsQuery } =
  serverApiSlice;

export default serverApiSlice;
