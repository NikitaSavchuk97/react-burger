import { instance } from '../store';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PatchInfoUserChangedDataPropTypes, PatchInfoUserDataPropTypes } from '../../utils/types';

export const patchInfoUser = createAsyncThunk<
  PatchInfoUserDataPropTypes,
  PatchInfoUserChangedDataPropTypes
>('userCurrent/patchInfoUser', async ({ nameValue, emailValue, passValue }) => {
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
});
