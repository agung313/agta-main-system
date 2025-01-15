import { createSlice } from '@reduxjs/toolkit';

export const components = createSlice({
  name: 'components',
  initialState: {
    isLoading: false,
    openNotification: false,
    delayNotification: 0,
    delayResetNotification: 100,
    notificationMessage: { id: '', en: '' },
    notificationType: 'success',
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.openNotification = false;
      state.notificationMessage = { id: '', en: '' };
      state.notificationType = 'success';
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    showNotification: (state, action) => {
      state.openNotification = true;
      state.notificationMessage = action.payload.message;
      state.notificationType = action.payload.type;
      state.delayNotification = action.payload.delay ? action.payload.delay : 0;
      state.delayResetNotification = action.payload.delayReset ? action.payload.delayReset : 100;
    },
    hideNotification: (state) => {
      state.openNotification = false;
    },
  },
});

export const {
    showLoading,
    hideLoading,
    showNotification,
    hideNotification,
} = components.actions;

export default components.reducer;
