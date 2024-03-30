import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postRegisterUser = createAsyncThunk(
  'userCurrent/postRegisterUser',
  async ({
    nameValue,
    emailValue,
    passValue,
  }: {
    nameValue: string;
    emailValue: string;
    passValue: string;
  }) => {
    const { data } = await axios.post(`${BASE_URL}/api/auth/register`, {
      email: emailValue,
      password: passValue,
      name: nameValue,
    });
    return data;
  },
);
