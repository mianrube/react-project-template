import { Stack, Typography } from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

import { CrashTestButton } from '../components/CrashTestButton';

const BASE_KEY = 'pages.HomePage';

export const HomePage = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'home' });

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4">{tScoped('title')}</Typography>
        <CrashTestButton />
      </Stack>
    </Stack>
  );
};
