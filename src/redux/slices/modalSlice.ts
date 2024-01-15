import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  modalTitle: string;
  modalType: string;
  modal: boolean;
  status: string;
}

const initialState: InitialState = {
  modalTitle: '',
  modalType: '',
  modal: false,
  status: 'loading', // loading | success | error
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.modalTitle = action.payload.title;
      state.modalType = action.payload.type;
      state.modal = true;
    },
    closeModal(state) {
      state.modalTitle = '';
      state.modalType = '';
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
