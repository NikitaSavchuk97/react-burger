import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postOrderUser = createAsyncThunk(
  'ingredientsCurrent/postOrderUser',
  async (order: Array<string>) => {
    const { data } = await instance.post(`/api/orders`, {
      ingredients: order,
    });
    return data;
  },
);
