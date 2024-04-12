import { instance } from '../store';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
    const { data } = await instance.patch(
      `/api/auth/user`,
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
