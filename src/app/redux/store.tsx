import { configureStore } from '@reduxjs/toolkit';
import header from './header';
import admin from './admin';

export const store = configureStore({
  reducer: {
    header: header,
    admin: admin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;