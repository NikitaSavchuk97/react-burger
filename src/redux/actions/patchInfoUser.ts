import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie';

export const patchInfoUser = createAsyncThunk(
  'userCurrent/patchInfoUser',
  async ({
    nameValue,
    emailValue,
    passValue,
  }: {
    nameValue: string;
    emailValue: string;
    passValue: string;
  }) => {
    const { data } = await axios.patch(
      `${BASE_URL}/api/auth/user`,
      {
        name: nameValue,
        email: emailValue,
        password: passValue,
      },
      { headers: { Authorization: 'Bearer ' + getCookie('accessToken') } },
    );

    return data;
  },
);
