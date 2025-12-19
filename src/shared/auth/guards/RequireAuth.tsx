import { useEffect, useRef } from 'react';

import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

import { loginRequest, storeReturnUrl } from '@shared/auth';

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const hasStartedLogin = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return;

    if (!isAuthenticated && !hasStartedLogin.current) {
      hasStartedLogin.current = true;

      const returnUrl = `${location.pathname}${location.search}${location.hash}`;
      storeReturnUrl(returnUrl);

      void instance.loginRedirect(loginRequest);
    }
  }, [instance, inProgress, isAuthenticated, location]);

  if (!isAuthenticated) return null;

  return children;
};
