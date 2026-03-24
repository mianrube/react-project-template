import { Box, Button, Stack, Typography } from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const ErrorState = ({ title, description, onRetry }: ErrorStateProps) => {
  const { tScoped } = useScopedTranslation('errorState', { ns: 'shared' });

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
        <Typography variant="h6">{title ?? tScoped('title')}</Typography>
        <Typography color="text.secondary">{description ?? tScoped('description')}</Typography>

        {onRetry ? (
          <Box>
            <Button variant="outlined" onClick={onRetry}>
              {tScoped('retry')}
            </Button>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
