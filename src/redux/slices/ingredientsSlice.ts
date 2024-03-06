import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/getIngredients';
import { IngredientsSlicePropTypes } from '../../utils/types';

const initialState: IngredientsSlicePropTypes = {
  ingredients: [],
  status: '',
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
