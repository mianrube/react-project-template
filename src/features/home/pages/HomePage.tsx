import { Stack, Typography } from '@mui/material';

import { AuthButtons, LanguageSwitcher, ThemeSwitcher } from '@shared/components';
import { useScopedTranslation } from '@shared/hooks';

import { usePingQuery } from '../api';

const BASE_KEY = 'pages.HomePage';

export const HomePage = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'home' });

  const { data, isLoading, isError } = usePingQuery();

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4">{tScoped('title')}</Typography>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <AuthButtons />

        <Typography variant="body2">
          {isLoading && 'Loading ping...'}
          {isError && 'Ping error (expected if no backend).'}
          {data && `Ping: ${data.ok ? 'OK' : 'NOT OK'}`}
        </Typography>
      </Stack>
    </Stack>
  );
};
