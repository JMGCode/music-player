import { getParamsString } from "../../../helpers";
import { spotifyApiSlice } from "./spotifySlice";

export const spotifyApiBrowserSlice = spotifyApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => `browse/categories`,
    }),
    getCategory: builder.query<any, string>({
      query: (categoryId) => `browse/categories/${categoryId}`,
    }),
    getCategoryPlaylist: builder.query<
      any,
      { categoryId: string; limit?: number; offset?: number; country?: string }
    >({
      query: ({ categoryId, ...rest }) => {
        const params = getParamsString(rest);
        return `browse/categories/${categoryId}/playlists/${params}`;
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryPlaylistQuery,
  useGetCategoryQuery,
} = spotifyApiBrowserSlice;
