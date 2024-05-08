import { instance } from '../store';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetCurrentUserPropTypes } from '../../utils/types';

export const getCurrentUser = createAsyncThunk<GetCurrentUserPropTypes, void>(
  'userCurrent/getCurrentUser',
  async () => {
    const { data } = await instance.get('/api/auth/user', {
      headers: { Authorization: 'Bearer ' + getCookie('accessToken') },
    });
    return data;
  },
);
