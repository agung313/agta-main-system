import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { visitor } from '../api/client';

// Thunk untuk mendapatkan data dari ipinfo API
export const fetchLocation = createAsyncThunk(
  'header/fetchLocation',
  async (_, { dispatch }) => {
    const lastVisitor = localStorage.getItem('lastVisitor');
    const now = new Date();
    let shouldUpdateVisitor = true;

    if (lastVisitor) {
      const lastVisitTime = new Date(lastVisitor);
      const timeDifference = now.getTime() - lastVisitTime.getTime();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeDifference < oneHour) {
        shouldUpdateVisitor = false;
      }
    }

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

    if (shouldUpdateVisitor) {
      await visitor({ countries: country });
      localStorage.setItem('lastVisitor', now.toISOString());
    }

    // Dispatch perubahan bahasa ke reducer
    return dispatch(changeOriginalLanguage({ language: language, country: country }));
  }
);

export const header = createSlice({
  name: 'header',
  initialState: {
    codeLanguage: 'en', // default language
    originalCodeLanguage: 'en', // default language
    idTabActive: 'homeTab',
    isChangeLanguage: false,
    location: {},
    loading: false,
    error: '' as string | null,
  },
  reducers: {
    resetState: (state) => {
      state.codeLanguage = 'en';
      state.originalCodeLanguage = 'en';
      state.idTabActive = 'homeTab';
      state.isChangeLanguage = false;
      state.location = {};
      state.loading = false;
      state.error = null;
    },
    changeLanguage: (state, action) => {
      state.codeLanguage = action.payload;
    },
    changeOriginalLanguage: (state, action) => {
      state.codeLanguage = action.payload.language;
      state.originalCodeLanguage = action.payload.country;
    },
    changeTabActive: (state, action) => {
      state.idTabActive = action.payload;
    },
    changeIsChangeLanguage: (state, action) => {
      state.isChangeLanguage = action.payload;
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

export const { changeLanguage, changeOriginalLanguage, changeTabActive, changeIsChangeLanguage, resetState } = header.actions;

export default header.reducer;
