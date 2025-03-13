import { createSlice } from "@reduxjs/toolkit";
import { testApiSlice } from "./testApiSlice";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    testData: null,
  },
  reducers: {
    //reducers function goes here
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      testApiSlice.endpoints.getFakeApiData.matchFulfilled,
      (state, action) => {
        state.testData = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const { logout } = testSlice.actions;
export default testSlice.reducer;
