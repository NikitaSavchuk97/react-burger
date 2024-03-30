import { createSlice } from '@reduxjs/toolkit';
import { postResetPass } from '../actions/postResetPass';
import { postLoginUser } from '../actions/postLoginUser';
import { postForgotPass } from '../actions/postForgotPass';
import { postRegisterUser } from '../actions/postRegisterUser';
import { getCurrentUser } from '../actions/getCurrentUser';
import { postLogoutUser } from '../actions/postLogoutUser';
import { patchInfoUser } from '../actions/patchInfoUser';

interface UserCurrentSlicePropTypes {
  userCurrentLoggedIn: boolean;
  userCurrent: object;
  userCurrentRegistrSuccessServerAnswer: boolean;
  userCurrentForgotPassServerAnswer: boolean;
  userCurrentResetPassServerAnswer: boolean;
  requestStatus: string;
}

const initialState: UserCurrentSlicePropTypes = {
  userCurrentLoggedIn: false,
  userCurrent: {},
  userCurrentRegistrSuccessServerAnswer: false,
  userCurrentForgotPassServerAnswer: false,
  userCurrentResetPassServerAnswer: false,
  requestStatus: '',
};

export const userCurrentSlice = createSlice({
  name: 'userCurrent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRegisterUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(postRegisterUser.fulfilled, (state, action) => {
        state.userCurrentRegistrSuccessServerAnswer = action.payload.success;
        state.requestStatus = 'success';
      })
      .addCase(postRegisterUser.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(postLoginUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(postLoginUser.fulfilled, (state, action) => {
        state.userCurrent = action.payload.user;
        state.userCurrentLoggedIn = action.payload.success;
        state.requestStatus = 'success';
      })
      .addCase(postLoginUser.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.userCurrentLoggedIn = true;
        state.userCurrent = action.payload.user;
        state.requestStatus = 'success';
      })
      .addCase(getCurrentUser.rejected, (state) => {
        //console.log('error');
        state.requestStatus = 'error';
      })
      .addCase(patchInfoUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(patchInfoUser.fulfilled, (state, action) => {
        state.userCurrent = action.payload.user;
        state.requestStatus = 'success';
      })
      .addCase(patchInfoUser.rejected, (state) => {
        //console.log('error');
        state.requestStatus = 'error';
      })
      .addCase(postLogoutUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(postLogoutUser.fulfilled, (state) => {
        state.userCurrentLoggedIn = false;
        state.userCurrent = {};
        state.requestStatus = 'success';
      })
      .addCase(postLogoutUser.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(postForgotPass.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(postForgotPass.fulfilled, (state, action) => {
        state.userCurrentForgotPassServerAnswer = action.payload.success;
        state.requestStatus = 'success';
      })
      .addCase(postForgotPass.rejected, (state) => {
        state.requestStatus = 'error';
      })
      .addCase(postResetPass.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(postResetPass.fulfilled, (state, action) => {
        state.userCurrentResetPassServerAnswer = action.payload.success;
        state.requestStatus = 'success';
      })
      .addCase(postResetPass.rejected, (state) => {
        state.requestStatus = 'error';
      });
  },
});

export default userCurrentSlice.reducer;
