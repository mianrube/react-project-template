import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip } from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

import { setThemeMode, type ThemeMode } from '@features/ui/store';

import { useAppDispatch, useAppSelector } from '@store';

const BASE_KEY = 'themeSwitcher';

export const ThemeSwitcher = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'shared' });
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  const handleToggleTheme = () => {
    const nextMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setThemeMode(nextMode));
  };

  const SwitchIcon = themeMode === 'light' ? DarkModeOutlined : LightModeOutlined;
  const tooltipLabel = themeMode === 'light' ? tScoped('turnOffLight') : tScoped('turnOnLight');

  return (
    <Tooltip title={tooltipLabel} arrow>
      <IconButton
        size="small"
        color="inherit"
        aria-label={tooltipLabel}
        onClick={handleToggleTheme}
      >
        <SwitchIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
