import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk('ingredients/getIngredients', async () => {
  const { data } = await axios.get(`${BASE_URL}/api/ingredients`);
  return data;
});
