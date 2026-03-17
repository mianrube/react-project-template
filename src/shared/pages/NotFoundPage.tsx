import { Box, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Not Found</Typography>
      <Typography sx={{ mt: 1 }}>The page you requested does not exist.</Typography>
    </Box>
  );
};
