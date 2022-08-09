import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});
export const fetchRegistration = createAsyncThunk(
  "auth/fetchRegistration",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "done";
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "done";
    },
    [fetchRegistration.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegistration.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
    },
    [fetchRegistration.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "done";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
