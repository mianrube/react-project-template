import { useMsal } from '@azure/msal-react';
import { Button, Stack } from '@mui/material';

import { loginRequest } from '@shared/auth';

export const AuthButtons = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleLogin = () => {
    void instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    void instance.logoutRedirect();
  };

  return (
    <Stack direction="row" spacing={1}>
      {!isAuthenticated ? (
        <Button variant="contained" onClick={handleLogin}>
          Sign in
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleLogout}>
          Sign out
        </Button>
      )}
    </Stack>
  );
};
