import { instance } from '../store';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCurrentUser = createAsyncThunk('userCurrent/getCurrentUser', async () => {
  const { data } = await instance.get('/api/auth/user', {
    headers: { Authorization: 'Bearer ' + getCookie('accessToken') },
  });
  return data;
});
