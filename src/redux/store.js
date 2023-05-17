import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './slicers/posts';
import { authReducer } from "./slicers/auth";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
