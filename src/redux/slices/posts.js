import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    // получение статей
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = "done";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = "failed";
      state.posts.items = [];
    });
    // получение тегов
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.status = "loading";
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.status = "failed";
      state.tags.items = [];
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.status = "done";
      state.tags.items = action.payload;
    });
    // удаление статьи
    builder.addCase(fetchDeletePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    });
  },
});

export const postsReducer = postsSlice.reducer;
