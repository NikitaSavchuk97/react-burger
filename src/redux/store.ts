import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import ingredientsCurrentSlice from './slices/ingredientsCurrentSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import userCurrentSlice from './slices/userCurrentSlice';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://norma.nomoreparties.space',
  timeout: 1000,
});

export const store = configureStore({
  reducer: {
    ingredientsSlice,
    ingredientsCurrentSlice,
    ingredientDetailsSlice,
    userCurrentSlice,
  },
});
