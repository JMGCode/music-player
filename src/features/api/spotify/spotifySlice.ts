import { IAPIMe, IAPIPlaylist, IAPISearch } from "./interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const spotifyApiSlice = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.spotify.com/v1/" }),
  endpoints: (builder) => ({
    getMe: builder.query<IAPIMe, void>({
      query: () => `me`,
    }),
    getPlaylists: builder.query<IAPIPlaylist, void>({
      query: () => "me/playlists",
    }),
    searchByTrack: builder.query<IAPISearch, string>({
      query: (trackName = "") => `search/?type=track&q=${trackName}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMeQuery, useGetPlaylistsQuery } = spotifyApiSlice;
