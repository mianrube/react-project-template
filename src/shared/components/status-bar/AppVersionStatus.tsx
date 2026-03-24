import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Stack, Typography } from '@mui/material';

import { appConfig } from '@shared/config/app-config';
import { useScopedTranslation } from '@shared/hooks';

export const AppVersionStatus = () => {
  const { tScoped } = useScopedTranslation('statusBar', { ns: 'shared' });

  return (
    <Stack direction="row" spacing={0.75} sx={{ minWidth: 0, alignItems: 'center' }}>
      <InfoOutlined
        sx={{ fontSize: 14, color: 'text.secondary', opacity: 0.8, display: 'block' }}
      />
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 0.2, lineHeight: 1 }}
      >
        {tScoped('version', { version: appConfig.appVersion })}
      </Typography>
    </Stack>
  );
};
