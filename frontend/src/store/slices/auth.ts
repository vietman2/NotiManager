import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

import { AuthUser } from "../../types";

const TOKEN_KEY = "token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
export const hasToken = () => !!getToken();

export const authenticate = createAsyncThunk("auth/authenticate", async () => {
  if (!hasToken()) {
    return null;
  }
  try {
    const response = await axios.get<AuthUser>("/api/user/");
    return response.data;
  } catch {
    removeToken();
    return null;
  }
});

const initialState: {
  user: AuthUser | null;
} = {
  user: null,
};

export const logout = () => {
  removeToken();
  return AuthSlice.actions.logout();
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const authSelector = (state: RootState) => state.auth;
export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
