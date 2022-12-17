import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

interface userState {
  displayName: string;
  photoURL: string;
  status: boolean;
  uid: string;
}

const initialState: userState = {
  displayName: '',
  photoURL: '',
  status: false,
  uid: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    CHANGE_USER_STATE: (state, { payload, type }) => {
      console.log('Gelen user Payload', payload);

      return {
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        status: true,
        uid: payload.uid,
      };
    },
  },
});

export const { CHANGE_USER_STATE } = userSlice.actions;

export const selectUserStatus = (state: RootState) => state.user;

export default userSlice.reducer;
