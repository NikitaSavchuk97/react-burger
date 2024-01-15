import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  ingredientDetails: object;
  status: string;
}

const initialState: InitialState = {
  ingredientDetails: {},
  status: 'loading', // loading | success | error
};

export const ingredientsDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientDetails(state, action) {
      state.ingredientDetails = action.payload;
    },
    removeIngredientDetails(state) {
      state.ingredientDetails = {};
    },
  },
});

export const { addIngredientDetails, removeIngredientDetails } = ingredientsDetailsSlice.actions;
export default ingredientsDetailsSlice.reducer;
