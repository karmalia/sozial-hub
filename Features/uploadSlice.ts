import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

export type uploadState = {
  isOpen: boolean;
};

const initialState: uploadState = {
  isOpen: false,
};

export const uploadSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    CHANGE_POPUP_STATE: (state, { payload, type }) => {
      state.isOpen = payload;
    },
  },
});

export const { CHANGE_POPUP_STATE } = uploadSlice.actions;

export const selectOpenStatus = (state: RootState) => state.popup.isOpen;

export default uploadSlice.reducer;
