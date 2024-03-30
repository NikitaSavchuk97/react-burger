import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postForgotPass = createAsyncThunk(
  'userCurrent/postForgotPass',
  async (email: string) => {
    const { data } = await axios.post(`${BASE_URL}/api/password-reset`, {
      email: email,
    });
    return data;
  },
);
