import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { AppBrand, AuthButtons, LanguageSwitcher, ThemeSwitcher } from '@shared/components';
import { useScopedTranslation } from '@shared/hooks';

import { toggleMobileSidebar } from '@features/ui/store';

import { useAppDispatch } from '@store';

export const TopBar = () => {
  const { tScoped } = useScopedTranslation('sidebar', { ns: 'shared' });
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: (currentTheme) => alpha(currentTheme.palette.common.white, 0.12),
        backgroundImage: (currentTheme) =>
          `linear-gradient(180deg, ${alpha(currentTheme.palette.common.white, 0.08)} 0%, transparent 100%)`,
        boxShadow: (currentTheme) =>
          `inset 0 -1px 0 ${alpha(currentTheme.palette.common.white, 0.08)}`,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 56 }}>
        {isMobile ? (
          <IconButton
            aria-label={tScoped('openNavigation')}
            color="inherit"
            edge="start"
            onClick={() => dispatch(toggleMobileSidebar())}
            sx={{
              borderRadius: 2,
              bgcolor: (currentTheme) => alpha(currentTheme.palette.common.white, 0.08),
              border: (currentTheme) =>
                `1px solid ${alpha(currentTheme.palette.common.white, 0.12)}`,
              '&:hover': {
                bgcolor: (currentTheme) => alpha(currentTheme.palette.common.white, 0.14),
              },
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>
        ) : null}

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <AppBrand showLogo showTitle titleI18nKey="projectName" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            px: 1,
            py: 0.5,
            borderRadius: 999,
            bgcolor: (currentTheme) => alpha(currentTheme.palette.common.white, 0.08),
            border: (currentTheme) => `1px solid ${alpha(currentTheme.palette.common.white, 0.12)}`,
          }}
        >
          <LanguageSwitcher />
          <ThemeSwitcher />
          <AuthButtons />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
