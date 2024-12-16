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
    isFromHeader: false,
    location: {} as any,
    loading: false,
    error: '' as string | null,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.codeLanguage = action.payload;
    },
    changeTabActive: (state, action) => {
      state.idTabActive = action.payload;
    },
    changeActiveFromHeader: (state, action) => {
      state.isFromHeader = action.payload;
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

export const { changeLanguage, changeTabActive, changeActiveFromHeader } = header.actions;

export default header.reducer;
