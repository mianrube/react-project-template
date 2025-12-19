export const THEME_MODES = ['light', 'dark'] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const designTokens = {
  light: {
    palette: {
      primary: '#1976d2',
      secondary: '#9c27b0',
      background: '#f5f5f5',
      surface: '#ffffff',
      textPrimary: '#111827',
      textSecondary: '#4b5563',
      divider: '#e5e7eb',
    },
  },
  dark: {
    palette: {
      primary: '#90caf9',
      secondary: '#ce93d8',
      background: '#0b1120',
      surface: '#020617',
      textPrimary: '#f9fafb',
      textSecondary: '#9ca3af',
      divider: '#1f2937',
    },
  },
} as const;
