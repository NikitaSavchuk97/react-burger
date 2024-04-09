import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk('ingredients/getIngredients', async () => {
  const { data } = await instance.get(`/api/ingredients`);
  return data;
});
