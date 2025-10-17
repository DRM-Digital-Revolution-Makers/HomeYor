import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { log } from "console";

type User = { id: string; name: string };

type AuthState = {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("https://smai.uz/api/v1/login/", {
        username,
        password,
      });
      return res.data; // { token, user }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Ошибка входа");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>
    ) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
