import { configureStore } from '@reduxjs/toolkit';
import recipesSlice from './index';
export const store = configureStore({
  reducer: {
    recipesReducer: recipesSlice,
  },
});
