import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
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
    <Stack
      direction="row"
      spacing={1}
      sx={{
        minWidth: 0,
        maxWidth: '65%',
        alignItems: 'center',
        borderRadius: 999,
        px: 1,
        py: 0.5,
        bgcolor: (theme) => theme.palette.action.hover,
      }}
    >
      <NotificationsOutlined
        sx={{ fontSize: 15, color: 'text.secondary', opacity: 0.85, display: 'block' }}
      />
      <Chip
        size="small"
        label={connected ? tScoped('signalrConnected') : tScoped('signalrDisconnected')}
        sx={{
          height: 22,
          fontWeight: 600,
          bgcolor: (theme) =>
            connected ? theme.palette.secondary.main : theme.palette.action.selected,
          color: (theme) =>
            connected ? theme.palette.secondary.contrastText : theme.palette.text.secondary,
          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />
      {last ? (
        <Typography
          variant="caption"
          sx={{
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'text.secondary',
            opacity: 0.9,
            lineHeight: 1,
          }}
        >
          {last.name} @ {last.atIso}
        </Typography>
      ) : (
        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.7, lineHeight: 1 }}>
          {tScoped('noNotifications')}
        </Typography>
      )}
    </Stack>
  );
};
