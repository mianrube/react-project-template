import { Box, CircularProgress, Stack, Typography } from '@mui/material';

type LoadingStateProps = {
  label?: string;
};

export const LoadingState = ({ label = 'Loading...' }: LoadingStateProps) => {
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
          {label}
        </Typography>
      </Stack>
    </Box>
  );
};
