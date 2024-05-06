import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostRegisterUserDataPropTypes, PostRegisterUserValuesPropTypes } from '../../utils/types';

export const postRegisterUser = createAsyncThunk<
  PostRegisterUserDataPropTypes,
  PostRegisterUserValuesPropTypes
>('userCurrent/postRegisterUser', async ({ nameValue, emailValue, passValue }) => {
  const { data } = await instance.post(`/api/auth/register`, {
    email: emailValue,
    password: passValue,
    name: nameValue,
  });

  console.log(data);
  return data;
});
