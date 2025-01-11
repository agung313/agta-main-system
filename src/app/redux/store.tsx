import { configureStore } from '@reduxjs/toolkit';
import header from './header';
import admin from './admin';
import components from './components';

export const store = configureStore({
  reducer: {
    header: header,
    admin: admin,
    components: components,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;