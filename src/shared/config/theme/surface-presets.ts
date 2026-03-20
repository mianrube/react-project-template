import type { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export const surfacePresets = {
  roundedPanel: (theme: Theme) => ({
    borderRadius: theme.spacing(2),
  }),
  highlightedPanel: (theme: Theme) => ({
    borderRadius: theme.spacing(2),
    background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${theme.palette.background.paper} 100%)`,
  }),
};
