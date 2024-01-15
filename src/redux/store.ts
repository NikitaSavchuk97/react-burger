import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import ingredientsCurrentSlice from './slices/ingredientsCurrentSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import modalSlice from './slices/modalSlice';

export const BASE_URL = 'https://norma.nomoreparties.space';
export const store = configureStore({
  reducer: {
    ingredientsSlice,
    ingredientsCurrentSlice,
    ingredientDetailsSlice,
    modalSlice,
  },
});
