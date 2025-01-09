import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk untuk mendapatkan data dari ipinfo API
export const fetchLocation = createAsyncThunk(
  'header/fetchLocation',
  async (_, { dispatch }) => {
    const response = await axios.get('https://ipinfo.io/json');
    // Tentukan bahasa berdasarkan negara
    const country = response.data.country;
    let language = 'en'; // default language

    // Menentukan bahasa berdasarkan negara
    if (country === 'ID') {
      language = 'id'; // Indonesia
    } else {
      language = 'en'; // English
    }

    // Dispatch perubahan bahasa ke reducer
    return dispatch(changeLanguage(language));
  }
);

export const header = createSlice({
  name: 'header',
  initialState: {
    codeLanguage: 'en', // default language
    idTabActive: 'homeTab',
    isChangeLanguage: false,
    location: {},
    loading: false,
    isLoading: false,
    error: '' as string | null,
  },
  reducers: {
    resetState: (state) => {
      state.codeLanguage = 'en';
      state.idTabActive = 'homeTab';
      state.isChangeLanguage = false;
      state.location = {};
      state.loading = false;
      state.error = null;
      state.isLoading = false;
    },
    changeLanguage: (state, action) => {
      state.codeLanguage = action.payload;
    },
    changeTabActive: (state, action) => {
      state.idTabActive = action.payload;
    },
    changeIsChangeLanguage: (state, action) => {
      state.isChangeLanguage = action.payload;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload || {};
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { changeLanguage, changeTabActive, changeIsChangeLanguage, resetState } = header.actions;

export default header.reducer;
