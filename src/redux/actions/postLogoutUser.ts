import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie';
import { removeCookie } from '../../utils/removeCookie';

export const postLogoutUser = createAsyncThunk('userCurrent/getLogoutUser', async () => {
  const { data } = await axios.post(`${BASE_URL}/api/auth/logout`, {
    token: getCookie('refreshToken'),
  });

  removeCookie('accessToken');
  removeCookie('refreshToken');

  return data;
});
