import { useMemo } from 'react';

import { MsalProvider } from '@azure/msal-react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { msalInstance } from '@shared/auth';
import { setDayjsLocale } from '@shared/config/localization';
import { createAppTheme } from '@shared/config/theme';
import { mapI18nLanguageToLocale } from '@shared/i18n/locale-mapping';

import { useAppSelector } from '@store';

import { I18nStoreSync } from './I18nStoreSync';

export const ProvidersRuntime = ({ children }: PropsWithChildren) => {
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  const { i18n } = useTranslation();
  const adapterLocale = useMemo(() => {
    const locale = mapI18nLanguageToLocale(i18n.language);
    setDayjsLocale(locale);
    return locale;
  }, [i18n.language]);

  return (
    <MsalProvider instance={msalInstance}>
      <I18nStoreSync />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </MsalProvider>
  );
};
