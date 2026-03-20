import type { PaletteMode } from '@mui/material/styles';
import { alpha, createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

import { designTokens } from './design-tokens';

export const createAppTheme = (mode: PaletteMode) => {
  const tokens = designTokens[mode];
  const chromeBackground = tokens.palette.appBar;
  const chromeForeground = tokens.palette.appBarContrastText;

  const baseTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.palette.primary.main,
        contrastText: tokens.palette.primary.contrastText,
      },
      secondary: {
        main: tokens.palette.secondary.main,
        contrastText: tokens.palette.secondary.contrastText,
      },
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

  return createTheme(baseTheme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body, #root': {
            height: '100%',
          },
          body: {
            overflow: 'hidden',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: chromeBackground,
            color: chromeForeground,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: chromeBackground,
              color: chromeForeground,
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: chromeBackground,
              color: chromeForeground,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: chromeForeground,
              fontWeight: 700,
            },
            '& .MuiDataGrid-iconSeparator': {
              color: alpha(chromeForeground, 0.42),
            },
            '& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIcon, & .MuiDataGrid-menuIconButton, & .MuiDataGrid-columnHeader svg':
              {
                color: `${chromeForeground} !important`,
                opacity: 1,
              },
            '& .MuiDataGrid-iconButtonContainer': {
              opacity: 1,
              visibility: 'visible',
            },
            '& .MuiDataGrid-iconButtonContainer .MuiIconButton-root': {
              backgroundColor: 'transparent',
              color: `${chromeForeground} !important`,
            },
            '& .MuiDataGrid-menuIconButton': {
              backgroundColor: 'transparent',
              color: `${chromeForeground} !important`,
            },
            '& .MuiDataGrid-iconButtonContainer .MuiIconButton-root:hover, & .MuiDataGrid-menuIconButton:hover':
              {
                backgroundColor: alpha(chromeForeground, 0.14),
              },
            '& .MuiDataGrid-iconButtonContainer .MuiIconButton-root:focus-visible, & .MuiDataGrid-menuIconButton:focus-visible':
              {
                outline: `2px solid ${alpha(chromeForeground, 0.65)}`,
                outlineOffset: -2,
              },
            '& .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-filler': {
              backgroundColor: chromeBackground,
            },
            '& .MuiDataGrid-cell': {
              alignItems: 'flex-start',
              paddingBottom: baseTheme.spacing(0.5),
              paddingTop: baseTheme.spacing(0.5),
            },
            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
              {
                outline: 'none',
              },
          },
        },
      },
    },
  });
};
