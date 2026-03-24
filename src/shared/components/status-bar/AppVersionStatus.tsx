import { Typography } from '@mui/material';

import { appConfig } from '@shared/config/app-config';
import { useScopedTranslation } from '@shared/hooks';

export const AppVersionStatus = () => {
  const { tScoped } = useScopedTranslation('statusBar', { ns: 'shared' });

  return (
    <Typography variant="caption" sx={{ opacity: 0.8 }}>
      {tScoped('version', { version: appConfig.appVersion })}
    </Typography>
  );
};
