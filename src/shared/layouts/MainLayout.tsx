import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { StatusBar } from '@shared/components';

export const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* TopBar / Header (future) */}
      {/* <TopBar /> */}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>

      {/* Status bar (always visible) */}
      <StatusBar />
    </Box>
  );
};
