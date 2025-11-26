// src/features/posts/postsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "./types";

import {
  fetchPostsApi,
  fetchPostByIdApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from "../../api/postsApi";

interface PostsState {
  items: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loading: false,
  error: null,
  successMessage: null,
};

// =======================
// 🔥 ASYNC THUNKS
// =======================

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPostsApi();
      return data as Post[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch single post
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchPostByIdApi(id);
      return data as Post;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Create a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    payload: { title: string; body: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await createPostApi({ ...payload, userId: 1 });
      return data as Post;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    { id, data }: { id: number; data: { title: string; body: string } },
    { rejectWithValue }
  ) => {
    try {
      const updated = await updatePostApi(id, data);
      return updated as Post;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await deletePostApi(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// =======================
// 🔥 SLICE
// =======================
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selectedPost = null;
      state.error = null;
      state.successMessage = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // ================= FETCH POSTS =================
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ================= FETCH ONE POST =================
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.selectedPost = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ================= CREATE POST =================
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
        state.successMessage = "Post created successfully!";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ================= UPDATE POST =================
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((p) => p.id === updated.id);

        if (index >= 0) {
          state.items[index] = updated;
        }

        state.selectedPost = updated;

        state.loading = false;
        state.successMessage = "Post updated successfully!";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ================= DELETE POST =================
    builder
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearSelected, clearSuccessMessage } = postsSlice.actions;
export default postsSlice.reducer;
