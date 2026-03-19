import { useMsal } from '@azure/msal-react';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { loginRequest } from '@shared/auth';
import { useScopedTranslation } from '@shared/hooks';

const BASE_KEY = 'authButtons';

export const AuthButtons = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'shared' });
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleLogin = () => {
    void instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    void instance.logoutRedirect();
  };

  const tooltipLabel = isAuthenticated ? tScoped('signOut') : tScoped('signIn');

  return (
    <Stack direction="row" spacing={1}>
      {!isAuthenticated ? (
        <Tooltip title={tooltipLabel} arrow>
          <IconButton size="small" color="inherit" aria-label={tooltipLabel} onClick={handleLogin}>
            <LoginOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={tooltipLabel} arrow>
          <IconButton size="small" color="inherit" aria-label={tooltipLabel} onClick={handleLogout}>
            <LogoutOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};
