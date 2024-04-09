import { createSlice } from '@reduxjs/toolkit';
import { IngredientsDetailsSlicePropTypes } from '../../utils/types';

const initialState: IngredientsDetailsSlicePropTypes = {
  ingredientDetails: null,
  status: 'loading',
};

export const ingredientsDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientDetails(state, action) {
      state.ingredientDetails = action.payload;
    },
    removeIngredientDetails(state) {
      state.ingredientDetails = null;
    },
  },
});

export const { addIngredientDetails, removeIngredientDetails } = ingredientsDetailsSlice.actions;
export default ingredientsDetailsSlice.reducer;
