import { createSlice } from '@reduxjs/toolkit';

export const admin = createSlice({
  name: 'admin',
  initialState: {
    idTabActive: 'homeTab',
    isLoading: false,
    isLoadingSubmit: false,
    isAdmin: false,
  },
  reducers: {
    resetState: (state) => {
      state.idTabActive = 'homeTab';
      state.isLoading = false;
    },
    changeTabActive: (state, action) => {
      state.idTabActive = action.payload;
    },
    showLoadingAdmin: (state) => {
      state.isLoading = true;
    },
    hideLoadingAdmin: (state) => {
      state.isLoading = false;
    },
    showLoadingSubmit: (state) => {
      state.isLoadingSubmit = true;
    },
    hideLoadingSubmit: (state) => {
      state.isLoadingSubmit = false;
    },
    handleSetIsAdmin: (state, action) => {
      state.isAdmin = action.payload === 'superAdmin' ? true : false;
    }
  },
});

export const {
  changeTabActive,
  resetState,
  showLoadingAdmin,
  hideLoadingAdmin,
  showLoadingSubmit,
  hideLoadingSubmit,
  handleSetIsAdmin,
} = admin.actions;

export default admin.reducer;
