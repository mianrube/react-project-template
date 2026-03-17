import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { AuthButtons, LanguageSwitcher, ThemeSwitcher } from '@shared/components';

export const TopBar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          React Project Template
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <AuthButtons />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
