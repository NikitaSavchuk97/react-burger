import axios from 'axios';
import { BASE_URL } from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk<any>('ingredients/fetchIngredients', async () => {
  const { data } = await axios.get(`${BASE_URL}/api/ingredients`);
  return data;
});

interface InitialState {
  ingredients: Array<object>;
  status: string;
}

const initialState: InitialState = {
  ingredients: [],
  status: '', // loading | success | error
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
        state.ingredients = [];
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.status = 'success';
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredients = [];
        state.status = 'error';
      });
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
