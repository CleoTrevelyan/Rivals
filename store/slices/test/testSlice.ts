import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./testApiSlice";

export const authSlice = createSlice({
  name: "test",
  initialState: {
    isAuthenticated: false,
    authToken: null,
    user: null,
    isLoading: false,
    error: null,

    testData: null,
  },
  reducers: {
    //reducers function goes here
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.getFakeApiData.matchFulfilled,
      (state, action) => {
        state.testData = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;
export default authSlice.reducer;
