import { instance } from '../store';
import { setCookie } from '../../utils/setCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostLoginUserDataPropTypes, PostLoginUserValuesPropTypes } from '../../utils/types';

export const postLoginUser = createAsyncThunk<
  PostLoginUserDataPropTypes,
  PostLoginUserValuesPropTypes
>('userCurrent/postLoginUser', async ({ emailValue, passValue }) => {
  const { data } = await instance.post(`/api/auth/login`, {
    email: emailValue,
    password: passValue,
  });

  setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
  setCookie('refreshToken', data.refreshToken);

  return data;
});
