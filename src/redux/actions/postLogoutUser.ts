import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie';
import { removeCookie } from '../../utils/removeCookie';

export const postLogoutUser = createAsyncThunk('userCurrent/getLogoutUser', async () => {
  const { data } = await instance.post(`/api/auth/logout`, {
    token: getCookie('refreshToken'),
  });

  removeCookie('accessToken');
  removeCookie('refreshToken');

  return data;
});
