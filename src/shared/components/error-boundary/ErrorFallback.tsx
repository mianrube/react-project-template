import { Box, Button, Stack, Typography } from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

type ErrorFallbackProps = {
  error?: Error | null;
  onRetry?: () => void;
};

const BASE_KEY = 'errorFallback';

export const ErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'shared' });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 560, textAlign: 'center' }}>
        <Typography variant="h4">{tScoped('title')}</Typography>

        <Typography color="text.secondary">{tScoped('description')}</Typography>

        {error?.message ? (
          <Typography
            variant="body2"
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              wordBreak: 'break-word',
            }}
          >
            {error.message}
          </Typography>
        ) : null}

        {onRetry ? (
          <Box>
            <Button variant="contained" onClick={onRetry}>
              {tScoped('retry')}
            </Button>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
