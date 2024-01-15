import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  
  status: string;
}

const initialState: InitialState = {
  
  status: 'loading', // loading | success | error
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // openModal(state, action) {
    //   state.modalTitle = action.payload.title;
    //   state.modalType = action.payload.type;
    //   state.modal = true;
    // },
    // closeModal(state) {
    //   state.modalTitle = '';
    //   state.modalType = '';
    //   state.modal = false;
    // },
  },
});

export const { } = modalSlice.actions;
export default modalSlice.reducer;
