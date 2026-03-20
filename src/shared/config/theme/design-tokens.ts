export const THEME_MODES = ['light', 'dark'] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const designTokens = {
  light: {
    palette: {
      appBar: '#29327B',
      appBarContrastText: '#ffffff',
      primary: {
        main: '#29327B',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00A896',
        contrastText: '#ffffff',
      },
      background: '#f6f8fc',
      surface: '#ffffff',
      textPrimary: '#16213d',
      textSecondary: '#5d6782',
      divider: '#dce3ef',
    },
  },
  dark: {
    palette: {
      appBar: '#29327B',
      appBarContrastText: '#ffffff',
      primary: {
        main: '#9ca8ff',
        contrastText: '#101633',
      },
      secondary: {
        main: '#49d2c3',
        contrastText: '#082622',
      },
      background: '#0b1124',
      surface: '#101936',
      textPrimary: '#f5f7ff',
      textSecondary: '#b4bfd8',
      divider: '#263156',
    },
  },
} as const;
