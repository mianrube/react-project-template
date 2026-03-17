import { Box, Button, Stack, Typography } from '@mui/material';

type ErrorFallbackProps = {
  error?: Error | null;
  onRetry?: () => void;
};

export const ErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => {
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
        <Typography variant="h4">Something went wrong</Typography>

        <Typography color="text.secondary">
          An unexpected error occurred while rendering the application.
        </Typography>

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
              Retry
            </Button>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
