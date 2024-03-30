import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postOrderUser = createAsyncThunk(
  'ingredientsCurrent/postOrderUser',
  async (order: Array<string>) => {
    const { data } = await axios.post(`${BASE_URL}/api/orders`, {
      ingredients: order,
    });
    return data;
  },
);
