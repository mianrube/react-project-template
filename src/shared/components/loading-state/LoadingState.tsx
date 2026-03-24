import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

type LoadingStateProps = {
  label?: string;
};

export const LoadingState = ({ label }: LoadingStateProps) => {
  const { tScoped } = useScopedTranslation('loadingState', { ns: 'shared' });

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
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <CircularProgress size={28} />
        <Typography variant="body2" color="text.secondary">
          {label ?? tScoped('label')}
        </Typography>
      </Stack>
    </Box>
  );
};
