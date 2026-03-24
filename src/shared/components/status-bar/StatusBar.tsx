import { Stack } from '@mui/material';

import { AppVersionStatus } from './AppVersionStatus';
import { SignalRNotificationsStatus } from './SignalRNotificationsStatus';

export const StatusBar = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        px: 1.5,
        py: 0.75,
        width: '100%',
        borderTop: 1,
        minHeight: 40,
        borderColor: (theme) => theme.palette.divider,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflow: 'hidden',
        background: (theme) =>
          `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
        boxShadow: (theme) => `inset 0 1px 0 ${theme.palette.action.selected}`,
      }}
    >
      <AppVersionStatus />
      <SignalRNotificationsStatus />
    </Stack>
  );
};
