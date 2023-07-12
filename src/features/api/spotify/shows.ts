import { spotifyApiSlice } from "./spotifySlice";

const extendedApiSlice = spotifyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShow: builder.query<any, string>({
      query: (showId) => `shows/${showId}`,
    }),

    getEpisodes: builder.query<any, string>({
      query: (showId) => `shows/${showId}/episodes`,
    }),
  }),
});

export const { useGetShowQuery, useGetEpisodesQuery } = extendedApiSlice;
