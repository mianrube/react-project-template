import type { PaletteMode } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { designTokens } from './design-tokens';

export const createAppTheme = (mode: PaletteMode) => {
  const tokens = designTokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: tokens.palette.primary },
      secondary: { main: tokens.palette.secondary },
      background: {
        default: tokens.palette.background,
        paper: tokens.palette.surface,
      },
      text: {
        primary: tokens.palette.textPrimary,
        secondary: tokens.palette.textSecondary,
      },
      divider: tokens.palette.divider,
    },
    typography: {
      fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    },
  });
};
