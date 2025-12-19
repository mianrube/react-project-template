import { Button, ButtonGroup } from '@mui/material';

import { setThemeMode, type ThemeMode } from '@features/ui/store';

import { useAppDispatch, useAppSelector } from '@store';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  const handleSetTheme = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode));
  };

  return (
    <ButtonGroup size="small" variant="outlined" aria-label="theme switcher">
      <Button onClick={() => handleSetTheme('light')} disabled={themeMode === 'light'}>
        Light
      </Button>
      <Button onClick={() => handleSetTheme('dark')} disabled={themeMode === 'dark'}>
        Dark
      </Button>
    </ButtonGroup>
  );
};
