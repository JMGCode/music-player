import { spotifyApiSlice } from "./spotifySlice";

export const spotifyApiMeSlice = spotifyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => `me`,
    }),
    getTopArtists: builder.query<any, void>({
      query: () => `me/top/artists`,
    }),
    getTopTracks: builder.query<any, void>({
      query: () => `me/top/tracks`,
    }),
    getFollowedArtists: builder.query<any, void>({
      query: () => `me/following?type=artist`,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
  useGetFollowedArtistsQuery,
} = spotifyApiMeSlice;
