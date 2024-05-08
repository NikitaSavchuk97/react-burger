import { instance } from '../store';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostOrderUserDataPropTypes } from '../../utils/types';

export const postOrderUser = createAsyncThunk<PostOrderUserDataPropTypes, Array<string>>(
  'ingredientsCurrent/postOrderUser',
  async (order) => {
    const { data } = await instance.post(
      '/api/orders',
      {
        ingredients: order,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getCookie('accessToken'),
        },
      },
    );

    return data;
  },
);
