import { instance } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/getCookie';

export const getCurrentUser = createAsyncThunk('userCurrent/getCurrentUser', async () => {
  const { data } = await instance.get('/api/auth/user', {
    headers: { Authorization: 'Bearer ' + getCookie('accessToken') },
  });
  return data;
});
