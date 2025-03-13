// Import the RTK Query methods from the React-specific entry point
import { RivalsServer } from "@/components/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseUrl = "https://jsonplaceholder.typicode.com";
// const baseUrl = "https://jsonplaceholder.typicode.com" || RivalsServer;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set("content-type", "application/json");
    //for handling authentication
    const token = (getState() as RootState).test;

    if (token) {
      // if (auth.token) {
      //   headers.set("authorization", token);
      // headers.set("authorization", auth.token);
    }
    return headers;
  },
});

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: baseQuery,
  // tagTypes: ["cartDetail"],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({}),
});
