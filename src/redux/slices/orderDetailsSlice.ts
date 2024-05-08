import { getCurrentOrder } from '../actions/getCurrentOrder';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  GetCurrentOrderDataPropTypes,
  OrderDetailsSlicePropTypes,
  OrderPropTypes,
} from '../../utils/types';

const initialState: OrderDetailsSlicePropTypes = {
  orderDetails: null,
  uploadedOrderDetails: null,
  status: '',
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    addOrderDetails(state, action: PayloadAction<OrderPropTypes>) {
      state.orderDetails = action.payload;
    },
    removeOrderDetails(state) {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getCurrentOrder.fulfilled,
        (state, action: PayloadAction<GetCurrentOrderDataPropTypes>) => {
          if (action.payload.orders.length === 0) {
            state.status = 'error';
          } else {
            state.orderDetails = action.payload.orders[0];
            state.status = 'success';
          }
        },
      )
      .addCase(getCurrentOrder.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { addOrderDetails, removeOrderDetails } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
