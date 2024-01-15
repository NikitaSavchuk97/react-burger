import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  bunCurrent: null | object;
  ingredientsCurrent: Array<object>;
  orderCurrentList: Array<object>;
  totalPrice: number;
  status: string;
}

const initialState: InitialState = {
  bunCurrent: [],
  ingredientsCurrent: [],
  orderCurrentList: [],
  totalPrice: 0,
  status: 'loading', // loading | success | error
};

export const ingredientsCurrentSlice = createSlice({
  name: 'ingredientsCurrent',
  initialState,
  reducers: {
    addBunCurrent(state, action) {
      state.bunCurrent = action.payload;
    },
    addToOrderList(state, action) {
      state.orderCurrentList = action.payload;
    },
    removeFromOrderList(state, action) {
      state.bunCurrent = action.payload;
    },
    addIngredientsCurrent(state, action) {
      state.ingredientsCurrent.push({
        ...action.payload.item,
        removeId: action.payload.item._id + action.payload.ingredientsCurrent.length,
      });
    },
    removeIngredientsCurrent(state, action) {
      state.ingredientsCurrent = state.ingredientsCurrent.filter(
        (item: any) => item.removeId !== action.payload,
      );
    },
    setTotalPrice(state, action) {
      state.totalPrice = 0;
      state.totalPrice = action.payload;
    },
  },
});

export const {
  addBunCurrent,
  addToOrderList,
  removeFromOrderList,
  addIngredientsCurrent,
  removeIngredientsCurrent,
  setTotalPrice,
} = ingredientsCurrentSlice.actions;
export default ingredientsCurrentSlice.reducer;
