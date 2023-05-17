import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axios";

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
  const {data} = await instance.get('posts')
    return data
})
export const fetchTags = createAsyncThunk('tags/fetchTags', async ()=>{
  const {data}= await instance.get('tags')
  return data
})
export const fetchPostRemove = createAsyncThunk('posts/fetchPostRemove', async (id)=>{
   await instance.delete(`posts/${id}`)


})
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers:{
    [fetchPosts.pending]: (state)=>{
      state.posts.items = []
      state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action)=>{
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    },
    [fetchPosts.rejected]: (state)=>{
      state.posts.items = []
      state.posts.status = 'error'
    },
    [fetchTags.pending]: (state)=>{
      state.tags.items = []
      state.tags.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action)=>{
      state.tags.items = action.payload
      state.tags.status = 'loaded'
    },
    [fetchTags.rejected]: (state)=>{
      state.tags.items = []
      state.tags.status = 'error'
    },
    [fetchPostRemove().pending]: (state,action)=>{
      state.posts.items = state.posts.items.filter(obj=>obj._id!==action.meta.arg)

    },

    [fetchTags.rejected]: (state)=>{
      state.tags.items = []
      state.tags.status = 'error'
    }

  }
});
export const postsReducer = postsSlice.reducer;
