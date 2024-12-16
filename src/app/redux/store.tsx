import { configureStore } from '@reduxjs/toolkit';
import header from './header';

export const store = configureStore({
  reducer: {
    header: header,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;