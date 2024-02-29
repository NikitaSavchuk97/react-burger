import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../actions/postOrder';

interface InitialState {
  bunCurrent: Array<object>;
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
    clearOrderList(state) {
      state.bunCurrent = [];
      state.ingredientsCurrent = [];
      state.orderCurrentList = [];
      state.totalPrice = 0;
      state.status = 'loading';
    },
    addIngredientsCurrent(state, action) {
      state.ingredientsCurrent.push({
        ...action.payload.item,
        removeId: action.payload.removeId,
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
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        console.log('{З}{а}{к}{а}{з}: ', action.payload);
        state.status = 'success';
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const {
  addBunCurrent,
  addToOrderList,
  clearOrderList,
  addIngredientsCurrent,
  removeIngredientsCurrent,
  setTotalPrice,
} = ingredientsCurrentSlice.actions;
export default ingredientsCurrentSlice.reducer;
