import { Box, Typography } from '@mui/material';

export const UnauthorizedPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Unauthorized</Typography>
      <Typography sx={{ mt: 1 }}>You do not have permission to access this page.</Typography>
    </Box>
  );
};
