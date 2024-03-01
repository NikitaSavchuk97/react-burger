import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../actions/postOrder';
import { ItemPropTypes } from '../../utils/types';

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
      state.ingredientsCurrent = state.ingredientsCurrent.filter((item: any) => {
        return item.removeId !== action.payload;
      });
    },
    moveIngredientsCurrent(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      if (
        dragIndex >= 0 &&
        dragIndex < state.ingredientsCurrent.length &&
        hoverIndex >= 0 &&
        hoverIndex < state.ingredientsCurrent.length
      ) {
        [state.ingredientsCurrent[dragIndex], state.ingredientsCurrent[hoverIndex]] = [
          state.ingredientsCurrent[hoverIndex],
          state.ingredientsCurrent[dragIndex],
        ];
      }
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
  moveIngredientsCurrent,
  setTotalPrice,
} = ingredientsCurrentSlice.actions;
export default ingredientsCurrentSlice.reducer;
