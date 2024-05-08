import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetCurrentOrderDataPropTypes, GetCurrentOrderIdPropTypes } from '../../utils/types';

export const getCurrentOrder = createAsyncThunk<
  GetCurrentOrderDataPropTypes,
  GetCurrentOrderIdPropTypes,
  {}
>('orderDetails/getCurrentOrder', async ({ id }) => {
  const { data } = await instance.get(`/api/orders/${id}`);
  return data;
});
