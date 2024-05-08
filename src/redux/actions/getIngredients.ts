import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetIngredientsPropTypes } from '../../utils/types';

export const getIngredients = createAsyncThunk<GetIngredientsPropTypes>(
  'ingredients/getIngredients',
  async () => {
    const { data } = await instance.get(`/api/ingredients`);
    return data;
  },
);
