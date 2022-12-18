import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userState } from '../Interfaces/interfaces';
import type { RootState } from './store';

const initialState: userState = {
  displayName: '',
  photoURL: '',
  email: '',
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
        email: payload.email,
        status: true,
        uid: payload.uid,
      };
    },
  },
});

export const { CHANGE_USER_STATE } = userSlice.actions;

export const selectUserStatus = (state: RootState) => state.user;

export default userSlice.reducer;
