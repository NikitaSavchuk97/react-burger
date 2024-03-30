import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postResetPass = createAsyncThunk(
  'userCurrent/postResetPass',
  async ({ keyValue, passValue }: { keyValue: string; passValue: string }) => {
    const { data } = await axios.post(`${BASE_URL}/api/password-reset/reset`, {
      password: passValue,
      token: keyValue,
    });
    return data;
  },
);
