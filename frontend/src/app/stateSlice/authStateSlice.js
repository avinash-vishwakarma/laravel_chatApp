import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    login: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
    setUserDetails: (state, { payload }) => {
      state.user.details = payload;
    },
  },
});

export const { setUser, login, logout, setUserDetails } = authSlice.actions;

export default authSlice.reducer;
