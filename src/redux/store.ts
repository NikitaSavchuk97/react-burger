import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import ingredientsCurrentSlice from './slices/ingredientsCurrentSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import userCurrentSlice from './slices/userCurrentSlice';

export const BASE_URL = 'https://norma.nomoreparties.space';
export const store = configureStore({
  reducer: {
    ingredientsSlice,
    ingredientsCurrentSlice,
    ingredientDetailsSlice,
    userCurrentSlice,
  },
});
