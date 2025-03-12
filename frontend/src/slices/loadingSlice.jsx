import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loding",
  initialState,

  reducers: {
    loadingOn: (state) => {
      state.loading = true;
    },
    loadingOff: (state) => {
      state.loading = false;
    },
  },
});

export const { loadingOn, loadingOff } = loadingSlice.actions;

export default loadingSlice.reducer;
