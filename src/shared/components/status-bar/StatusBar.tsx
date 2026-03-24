import { Stack } from '@mui/material';

import { AppVersionStatus } from './AppVersionStatus';
import { SignalRNotificationsStatus } from './SignalRNotificationsStatus';

export const StatusBar = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ p: 1, borderTop: 1, borderColor: 'divider', alignItems: 'center' }}
    >
      <AppVersionStatus />
      <SignalRNotificationsStatus />
    </Stack>
  );
};
