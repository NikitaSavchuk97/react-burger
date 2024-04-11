import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/getIngredients';
import { IngredientsSlicePropTypes } from '../../utils/types';

const initialState: IngredientsSlicePropTypes = {
  ingredients: null,
  status: 'loading',
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
        state.ingredients = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        localStorage.setItem('ingredientsLocalStorage', JSON.stringify(action.payload.data));
        state.status = 'success';
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredients = null;
        state.status = 'error';
      });
  },
});

export const { setIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
