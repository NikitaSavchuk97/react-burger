import { instance } from '../store';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeCookie } from '../../utils/removeCookie';
import { PostLogoutUserPropTypes } from '../../utils/types';

export const postLogoutUser = createAsyncThunk<PostLogoutUserPropTypes>(
  'userCurrent/getLogoutUser',
  async () => {
    const { data } = await instance.post(`/api/auth/logout`, {
      token: getCookie('refreshToken'),
    });

    removeCookie('accessToken');
    removeCookie('refreshToken');

    return data;
  },
);
