import { IMe, IPlaylists, ISearch, ISearchItem } from "./interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IPlaylist } from "./interfaces/playlist";
import { ITrack } from "../../../Tracks/TrackItem";
import { RootState } from "../../../app/store";
import { getSmallestImage } from "../../../helpers";

// Define a service using a base URL and expected endpoints
export const spotifyApiSlice = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<IMe, void>({
      query: () => `me`,
    }),
    getPlaylists: builder.query<
      { name: string; trackUri: string; id: any }[],
      void
    >({
      query: () => "me/playlists",
      transformResponse: (response: IPlaylists) => {
        return response.items.map((item) => {
          return { name: item.name, trackUri: item.tracks.href, id: item.id };
        });
      },
    }),
    getPlaylistTracks: builder.query<ITrack[], string>({
      query: (id) => `https://api.spotify.com/v1/playlists/${id}`,
      transformResponse: (response: IPlaylist) => {
        const items = response.tracks.items;
        const filterItems = items.filter((item) => item.track !== null);

        const trackItems = filterItems.map((item: any) => {
          const { track } = item;
          const smallestImage = getSmallestImage(track.album.images);

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestImage.url,
          };
        });
        return trackItems;
      },
    }),
    searchByTrack: builder.query<ITrack[], string>({
      query: (trackName = "") => `search/?type=track&q=${trackName}`,
      transformResponse: (response: ISearch) => {
        return response.tracks.items.map((item) => {
          const smallestImage = getSmallestImage(item.album.images);
          return {
            artist: item.artists[0].name,
            title: item.name,
            uri: item.uri,
            albumUrl: smallestImage.url,
          };
        });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMeQuery,
  useGetPlaylistsQuery,
  useSearchByTrackQuery,
  useGetPlaylistTracksQuery,
} = spotifyApiSlice;
