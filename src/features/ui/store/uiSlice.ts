import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'es';

export type UiState = {
  themeMode: ThemeMode;
  language: Language;
  sidebarExpanded: boolean;
  mobileSidebarOpen: boolean;
};

const initialState: UiState = {
  themeMode: 'light',
  language: 'en',
  sidebarExpanded: true,
  mobileSidebarOpen: false,
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
    setSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.sidebarExpanded = action.payload;
    },
    toggleSidebarExpanded: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
  },
});

export const {
  setThemeMode,
  setLanguage,
  setSidebarExpanded,
  toggleSidebarExpanded,
  setMobileSidebarOpen,
  toggleMobileSidebar,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
