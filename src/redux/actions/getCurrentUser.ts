import axios from 'axios';
import { BASE_URL } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie';

export const getCurrentUser = createAsyncThunk('userCurrent/getCurrentUser', async () => {
  const { data } = await axios.get(`${BASE_URL}/api/auth/user`, {
    headers: { Authorization: 'Bearer ' + getCookie('accessToken') },
  });
  return data;
});
