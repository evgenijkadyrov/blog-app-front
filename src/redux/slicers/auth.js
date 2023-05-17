import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../axios";
import { fetchPosts, fetchTags } from "./posts";

const initialState = {
data: null,
   status:'loading'

};
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params)=>{
  const {data} = await instance.post('auth/login', params)
  return data
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params)=>{
  const {data} = await instance.get('auth/me', params)
  return data
})
export const fetchRegistration= createAsyncThunk('auth/fetchRegistration', async (params)=>{
  const {data} = await instance.post('auth/registration', params)
  return data
})
export const authSlice = createSlice({
  name: 'auth',
  initialState,
reducers:{
    logout: state=>{
      state.data = null
    }
},
  extraReducers:{
    [fetchAuth.pending]: (state)=>{
      state.data = null
      state.status = 'loading'
    },
    [fetchAuth.fulfilled]: (state, action)=>{
      state.data = action.payload
      state.status = 'loaded'
    },
    [fetchAuth.rejected]: (state)=>{
      state.data = null
      state.status = 'error'
    },
    [fetchAuthMe.pending]: (state)=>{
      state.data = null
      state.status = 'loading'
    },
    [fetchAuthMe.fulfilled]: (state, action)=>{
      state.data = action.payload
      state.status = 'loaded'
    },
    [fetchAuthMe.rejected]: (state)=>{
      state.data = null
      state.status = 'error'
    },
    [fetchRegistration.pending]: (state)=>{
      state.data = null
      state.status = 'loading'
    },
    [fetchRegistration.fulfilled]: (state, action)=>{
      state.data = action.payload
      state.status = 'loaded'
    },
    [fetchRegistration.rejected]: (state)=>{
      state.data = null
      state.status = 'error'
    },

  }
});
export const isAuthSelector= state=>Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions