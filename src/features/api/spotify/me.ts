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
    getLikedTracks: builder.query<any, void>({
      query: () => `me/tracks`,
    }),
    getLikedShows: builder.query<any, void>({
      query: () => `me/shows`,
    }),
    getLikedAlbums: builder.query<any, void>({
      query: () => `me/albums`,
    }),
    getLikedEpisodes: builder.query<any, void>({
      query: () => `me/episodes`,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
  useGetFollowedArtistsQuery,
  useGetLikedTracksQuery,
  useGetLikedShowsQuery,
  useGetLikedAlbumsQuery,
  useGetLikedEpisodesQuery,
} = spotifyApiMeSlice;
