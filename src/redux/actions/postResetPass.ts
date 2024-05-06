import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostResetPassDataPropTypes, PostResetPassValuesPropTypes } from '../../utils/types';

export const postResetPass = createAsyncThunk<
  PostResetPassDataPropTypes,
  PostResetPassValuesPropTypes
>('userCurrent/postResetPass', async ({ keyValue, passValue }) => {
  const { data } = await instance.post(`/api/password-reset/reset`, {
    password: passValue,
    token: keyValue,
  });
  return data;
});
