import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postForgotPass = createAsyncThunk(
  'userCurrent/postForgotPass',
  async (email: string) => {
    const { data } = await instance.post(`/api/password-reset`, {
      email: email,
    });
    return data;
  },
);
