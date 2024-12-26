import { createSlice } from '@reduxjs/toolkit';

export const admin = createSlice({
  name: 'admin',
  initialState: {
    idTabActive: 'homeTab',
  },
  reducers: {
    resetState: (state) => {
      state.idTabActive = 'homeTab';
    },
    changeTabActive: (state, action) => {
      state.idTabActive = action.payload;
    },
  },
});

export const { changeTabActive, resetState } = admin.actions;

export default admin.reducer;
