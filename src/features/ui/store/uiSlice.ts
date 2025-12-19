import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'es';

export type UiState = {
  themeMode: ThemeMode;
  language: Language;
};

const initialState: UiState = {
  themeMode: 'light',
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setThemeMode, setLanguage } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
