import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IngredientsDetailsSlicePropTypes, ItemPropTypes } from '../../utils/types';

export const initialState: IngredientsDetailsSlicePropTypes = {
  ingredientDetails: null,
  status: 'loading',
};

const ingredientsDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientDetails(state, action: PayloadAction<ItemPropTypes>) {
      state.ingredientDetails = action.payload;
    },
    removeIngredientDetails(state) {
      state.ingredientDetails = null;
    },
  },
});

export const { addIngredientDetails, removeIngredientDetails } = ingredientsDetailsSlice.actions;

export default ingredientsDetailsSlice.reducer;
