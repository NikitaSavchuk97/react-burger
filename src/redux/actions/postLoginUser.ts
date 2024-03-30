import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/setCookie';

export const postLoginUser = createAsyncThunk(
  'userCurrent/postLoginUser',
  async ({ emailValue, passValue }: { emailValue: string; passValue: string }) => {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: emailValue,
      password: passValue,
    });
    setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
    setCookie('refreshToken', data.refreshToken);
    return data;
  },
);
