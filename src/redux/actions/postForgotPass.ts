import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostForgotPassDataPropTypes, PostForgotPassEmailPropTypes } from '../../utils/types';

export const postForgotPass = createAsyncThunk<
  PostForgotPassDataPropTypes,
  PostForgotPassEmailPropTypes
>('userCurrent/postForgotPass', async ({ email }) => {
  const { data } = await instance.post(`/api/password-reset`, {
    email: email,
  });

  console.log(data);
  return data;
});
