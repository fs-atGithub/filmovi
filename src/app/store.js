import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import authReducer from '../features/auth'; // assuming authSlice is in this path

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    auth: authReducer, // added the auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
