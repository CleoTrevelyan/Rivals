import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFakeApiData: builder.query({
      query: () => `/todos`,
    }),
  }),
});

export const { useGetFakeApiDataQuery } = authApiSlice;
