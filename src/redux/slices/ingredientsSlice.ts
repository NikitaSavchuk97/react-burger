import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/getIngredients';
import { GetIngredientsPropTypes, IngredientsSlicePropTypes } from '../../utils/types';

export const initialState: IngredientsSlicePropTypes = {
  ingredients: null,
  status: '',
};

 const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
        state.ingredients = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<GetIngredientsPropTypes>) => {
          state.ingredients = action.payload.data;
          //localStorage.setItem('ingredientsLocalStorage', JSON.stringify(action.payload.data));
          state.status = 'success';
        },
      )
      .addCase(getIngredients.rejected, (state) => {
        state.ingredients = null;
        state.status = 'error';
      });
  },
});

export default ingredientsSlice.reducer;
