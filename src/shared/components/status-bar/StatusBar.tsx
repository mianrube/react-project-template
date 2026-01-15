import { Chip, Stack, Typography } from '@mui/material';

import { useAppSelector } from '@store';

export const StatusBar = () => {
  const connected = useAppSelector((s) => s.realtime.notificationsConnected);
  const last = useAppSelector((s) => s.realtime.lastNotification);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ p: 1, borderTop: 1, borderColor: 'divider', alignItems: 'center' }}
    >
      <Chip size="small" label={connected ? 'SignalR: Connected' : 'SignalR: Disconnected'} />
      {last ? (
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {last.name} @ {last.atIso}
        </Typography>
      ) : (
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          No notifications yet
        </Typography>
      )}
    </Stack>
  );
};
