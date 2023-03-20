import { getParamsString } from "../../../helpers";
import { spotifyApiSlice } from "./spotifySlice";

export type AlbumGroupType = "album" | "single" | "appears_on" | "compilation";

export const spotifyApiBrowserSlice = spotifyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtist: builder.query<any, string>({
      query: (artistId) => {
        return `artists/${artistId}`;
      },
    }),
    getArtistsAlbums: builder.query<
      any,
      { artistId: string; groups: AlbumGroupType[]; limit?: number }
    >({
      query: ({ artistId, groups, ...rest }) => {
        const gr = groups.join();

        const params = getParamsString({
          include_groups: gr,
          ...rest,
        });
        return `artists/${artistId}/albums/${params}`;
      },
    }),

    getArtistsRelated: builder.query<any, string>({
      query: (artistId) => `artists/${artistId}/related-artists`,
    }),

    getArtistTopTracks: builder.query<
      any,
      { artistId: string; limit?: number; country?: string }
    >({
      query: ({ artistId, ...rest }) => {
        const params = getParamsString(rest);
        return `artists/${artistId}/top-tracks/${params}`;
      },
    }),
  }),
});

export const {
  useGetArtistQuery,
  useGetArtistsAlbumsQuery,
  useGetArtistTopTracksQuery,
  useGetArtistsRelatedQuery,
} = spotifyApiBrowserSlice;
