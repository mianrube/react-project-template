import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Sidebar, StatusBar, TopBar } from '@shared/components';

export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      <TopBar />

      <Box sx={{ flex: 1, display: 'flex', minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
        <Sidebar />

        <Box component="main" sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>

      <StatusBar />
    </Box>
  );
};
