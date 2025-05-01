import { createSlice } from "@reduxjs/toolkit";

const tokenData = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const userData =
  tokenData && tokenData.expiry > new Date().getTime()
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
  user: userData?.user || null,
  token: tokenData || null,
  isAuthenticated: tokenData?.expiry > new Date().getTime() ? true : false,
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
