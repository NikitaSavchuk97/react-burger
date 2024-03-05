import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postOrder = createAsyncThunk('ingredients/postOrder', async (order: Array<string>) => {
  const { data } = await axios.post(`${BASE_URL}/api/orders`, {
    ingredients: order,
  });
  return data;
});
