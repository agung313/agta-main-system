import { createSlice } from '@reduxjs/toolkit';

export const admin = createSlice({
  name: 'admin',
  initialState: {
    idTabActive: 'homeTab',
    isLoading: false,
  },
  reducers: {
    resetState: (state) => {
      state.idTabActive = 'homeTab';
      state.isLoading = false;
    },
    changeTabActive: (state, action) => {
      state.idTabActive = action.payload;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { changeTabActive, resetState } = admin.actions;

export default admin.reducer;
