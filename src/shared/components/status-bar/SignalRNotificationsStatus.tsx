import { Chip, Stack, Typography } from '@mui/material';

import { appConfig } from '@shared/config/app-config';
import { useScopedTranslation } from '@shared/hooks';

import { useAppSelector } from '@store';

export const SignalRNotificationsStatus = () => {
  const { tScoped } = useScopedTranslation('statusBar', { ns: 'shared' });
  const connected = useAppSelector((s) => s.realtime.notificationsConnected);
  const last = useAppSelector((s) => s.realtime.lastNotification);

  if (!appConfig.signalR.notificationsEnabled) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Chip
        size="small"
        label={connected ? tScoped('signalrConnected') : tScoped('signalrDisconnected')}
      />
      {last ? (
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {last.name} @ {last.atIso}
        </Typography>
      ) : (
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          {tScoped('noNotifications')}
        </Typography>
      )}
    </Stack>
  );
};
