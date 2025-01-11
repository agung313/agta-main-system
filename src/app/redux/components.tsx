import { createSlice } from '@reduxjs/toolkit';

export const components = createSlice({
  name: 'components',
  initialState: {
    isLoading: false,
    openNotification: false,
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
    },
    hideNotification: (state) => {
      state.openNotification = false;
      state.notificationMessage = { id: '', en: '' };
      state.notificationType = 'success';
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
