import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")).user || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      () => {
        localStorage.setItem("user", "");
        localStorage.setItem("token", "");
      };
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
