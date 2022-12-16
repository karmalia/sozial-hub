import {
  Action,
  configureStore,
  ThunkAction,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice';
import userReducer from './userSlice';
import { firebaseApi } from './firebaseApi';

export const store = configureStore({
  reducer: {
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    popup: uploadReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      firebaseApi.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
