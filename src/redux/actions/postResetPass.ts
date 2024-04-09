import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postResetPass = createAsyncThunk(
  'userCurrent/postResetPass',
  async ({ keyValue, passValue }: { keyValue: string; passValue: string }) => {
    const { data } = await instance.post(`/api/password-reset/reset`, {
      password: passValue,
      token: keyValue,
    });
    return data;
  },
);
