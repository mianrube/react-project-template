import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Sidebar, StatusBar, TopBar } from '@shared/components';

export const MainLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />

      <Box sx={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar />

        <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>

      <StatusBar />
    </Box>
  );
};
