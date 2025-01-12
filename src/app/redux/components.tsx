import { createSlice } from '@reduxjs/toolkit';

export const components = createSlice({
  name: 'components',
  initialState: {
    isLoading: false,
    openNotification: false,
    delayNotification: 0,
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
    },
  },
});

export const {
    showLoading,
    hideLoading,
    showNotification,
} = components.actions;

export default components.reducer;
