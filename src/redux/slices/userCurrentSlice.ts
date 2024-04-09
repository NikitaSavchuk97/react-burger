import { createSlice } from '@reduxjs/toolkit';
import { postResetPass } from '../actions/postResetPass';
import { postLoginUser } from '../actions/postLoginUser';
import { postForgotPass } from '../actions/postForgotPass';
import { postRegisterUser } from '../actions/postRegisterUser';
import { getCurrentUser } from '../actions/getCurrentUser';
import { postLogoutUser } from '../actions/postLogoutUser';
import { patchInfoUser } from '../actions/patchInfoUser';
import { UserCurrentSlicePropTypes } from '../../utils/types';

const initialState: UserCurrentSlicePropTypes = {
  userCurrentLoggedIn: false,
  userCurrent: {},
  userCurrentRegistrSuccessServerAnswer: false,
  userCurrentForgotPassServerAnswer: false,
  userCurrentResetPassServerAnswer: false,
  status: 'loading',
};

export const userCurrentSlice = createSlice({
  name: 'userCurrent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRegisterUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postRegisterUser.fulfilled, (state, action) => {
        state.userCurrentRegistrSuccessServerAnswer = action.payload.success;
        state.status = 'success';
      })
      .addCase(postRegisterUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(postLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postLoginUser.fulfilled, (state, action) => {
        state.userCurrent = action.payload.user;
        state.userCurrentLoggedIn = action.payload.success;
        state.status = 'success';
      })
      .addCase(postLoginUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.userCurrentLoggedIn = true;
        state.userCurrent = action.payload.user;
        state.status = 'success';
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(patchInfoUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchInfoUser.fulfilled, (state, action) => {
        state.userCurrent = action.payload.user;
        state.status = 'success';
      })
      .addCase(patchInfoUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(postLogoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postLogoutUser.fulfilled, (state) => {
        state.userCurrentLoggedIn = false;
        state.userCurrent = {};
        state.status = 'success';
      })
      .addCase(postLogoutUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(postForgotPass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postForgotPass.fulfilled, (state, action) => {
        state.userCurrentForgotPassServerAnswer = action.payload.success;
        state.status = 'success';
      })
      .addCase(postForgotPass.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(postResetPass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postResetPass.fulfilled, (state, action) => {
        state.userCurrentResetPassServerAnswer = action.payload.success;
        state.status = 'success';
      })
      .addCase(postResetPass.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default userCurrentSlice.reducer;
