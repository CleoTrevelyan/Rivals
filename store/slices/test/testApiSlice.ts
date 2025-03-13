import { apiSlice } from "../../api/apiSlice";

export const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFakeApiData: builder.query({
      query: () => `/users`,
    }),
  }),
});

export const { useGetFakeApiDataQuery } = testApiSlice;
