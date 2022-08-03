import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchUserData = createAsyncThunk(
  "/auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
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
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUserData.rejected]: (state) => {
      state.data = null;
      state.status = "failed";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "done";
    },
  },
});
