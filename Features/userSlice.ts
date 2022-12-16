import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

const initialState = {
  displayName: '',
  photoURL: '',
  status: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    CHANGE_USER_STATE: (state, { payload, type }) => {
      console.log('Gelen user Payload', payload);

      return { ...payload };
    },
  },
});

export const { CHANGE_USER_STATE } = userSlice.actions;

export const selectUserStatus = (state: RootState) => state.user;

export default userSlice.reducer;
