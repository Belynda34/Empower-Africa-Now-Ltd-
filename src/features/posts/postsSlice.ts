// src/features/posts/postsSlice.ts
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "./types";
import {
  fetchPostsApi,
  fetchPostByIdApi,
  createPostApi,
  updatePostApi,
  deletePostApi
} from "../../api/postsApi";

interface PostsState {
  items: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loading: false,
  error: null
};

// Async thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchPostsApi();
    return data as Post[];
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

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

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload: { title: string; body: string }, { rejectWithValue }) => {
    try {
      const data = await createPostApi({ ...payload, userId: 1 });
      return data as Post;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, title, body }: { id: number; title: string; body: string }, { rejectWithValue }) => {
    try {
      const data = await updatePostApi(id, { title, body });
      return data as Post;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

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

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selectedPost = null;
    }
  },
  extraReducers: (builder) => {
    // fetchPosts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchPostById
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.selectedPost = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // createPost
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        // jsonplaceholder returns created object with id
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // updatePost
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
        if (state.selectedPost?.id === action.payload.id) state.selectedPost = action.payload;
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // deletePost
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        if (state.selectedPost?.id === action.payload) state.selectedPost = null;
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearSelected } = postsSlice.actions;
export default postsSlice.reducer;
