import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        {isMobile ? (
          <IconButton
            aria-label={tScoped('openNavigation')}
            color="inherit"
            edge="start"
            onClick={() => dispatch(toggleMobileSidebar())}
          >
            <MenuOutlinedIcon />
          </IconButton>
        ) : null}

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <AppBrand showLogo showTitle titleI18nKey="projectName" />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <LanguageSwitcher />
          <ThemeSwitcher />
          <AuthButtons />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
