import { Box, Button, Stack, Typography } from '@mui/material';

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'The requested data could not be loaded.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <Box
      sx={{
        minHeight: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 520, textAlign: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{description}</Typography>

        {onRetry ? (
          <Box>
            <Button variant="outlined" onClick={onRetry}>
              Retry
            </Button>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
