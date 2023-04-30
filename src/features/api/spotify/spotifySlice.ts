import { IGenSearch, Image } from "./interfaces/genericSearch";
import { IMe, IPlaylists, ISearch } from "./interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import CustomFetch from "../customFetch";
import { IPlaylist } from "./interfaces/playlist";
import { ISpotifyTrack } from "../../dashboard/dashboardSlice";
import { RootState } from "../../../app/store";
import { getParamsString } from "../../../helpers";

interface IPlayListTracksResponse {
  uri: string;
  name: string;
  owner: string | undefined;
  total: number;
  image: string;
  public: boolean;
  tracks: ISpotifyTrack[];
}

// Define a service using a base URL and expected endpoints

export const spotifyApiSlice = createApi({
  reducerPath: "spotifyApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://api.spotify.com/v1/",
  //   prepareHeaders: (headers, { getState }) => {
  //     const state = getState() as RootState;
  //     const token = state.auth.accessToken;
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  baseQuery: CustomFetch,
  tagTypes: ["Devices"],
  endpoints: (builder) => ({
    getPlaylists: builder.query<
      {
        name: string;
        trackUri: string;
        id: any;
        // images: { height: number; width: number; url: string }[];
        images: Image[];
        ownerName: string;
      }[],
      void
    >({
      query: () => "me/playlists?limit=30",
      transformResponse: (response: any) => {
        return response.items.map((item: any) => {
          return {
            name: item.name,
            trackUri: item.tracks.href,
            id: item.id,
            images: item.images,
            ownerName: item.owner.display_name,
          };
        });
      },
    }),
    getPlaylistTracks: builder.query<IPlayListTracksResponse, string>({
      query: (id) => `playlists/${id}`,
      transformResponse: (response: IPlaylist) => {
        const image = response.images[1]
          ? response.images[1].url
          : response.images[0].url;

        const info = {
          uri: response.uri,
          name: response.name,
          owner: response.owner.display_name,
          total: response.tracks.total,
          public: response.public,
          image,
        };

        const items = response.tracks.items;
        const filterItems = items.filter((item) => item.track !== null);
        const trackItems = filterItems.map((item: any) => {
          const { track } = item;
          return track;
        });
        return { ...info, tracks: trackItems };
      },
    }),
    getAlbumTracks: builder.query<any, string>({
      query: (id) => `albums/${id}`,
      transformResponse: (response: any) => {
        console.log("Album response:", response);
        const image = response.images[1]
          ? response.images[1].url
          : response.images[0].url;

        const info = {
          uri: response.uri,
          name: response.name,
          total: response.tracks.total,
          image,
        };

        const items = response.tracks.items;
        const filterItems = items.filter((item: any) => item.track !== null);
        const trackItems = filterItems.map((item: any) => ({
          ...item,
          album: { images: response.images },
        }));
        return { ...info, tracks: trackItems };
      },
    }),
    searchByTrack: builder.query<ISpotifyTrack[], string>({
      query: (trackName = "") => `search/?type=track&q=${trackName}`,
      transformResponse: (response: ISearch) => {
        return response.tracks.items.map((item: any) => {
          return item;
        });
      },
    }),
    search: builder.query<
      IGenSearch,
      { query: string; types: string[]; limit?: number }
    >({
      query: ({ query, types, limit }) => {
        const params = getParamsString({ type: types, q: query, limit });
        return `search${params}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPlaylistsQuery,
  useSearchByTrackQuery,
  useGetPlaylistTracksQuery,
  useGetAlbumTracksQuery,
  useSearchQuery,
} = spotifyApiSlice;
