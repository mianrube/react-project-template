import { useEffect, useRef } from 'react';

import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router';

import { consumeReturnUrl } from '@shared/auth';

export const AuthReturnUrlSync = () => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) return;

    // Wait until MSAL is idle and user is authenticated
    if (inProgress !== InteractionStatus.None) return;
    if (!isAuthenticated) return;

    const returnUrl = consumeReturnUrl();
    if (returnUrl) {
      hasNavigated.current = true;
      navigate(returnUrl, { replace: true });
    }
  }, [inProgress, isAuthenticated, navigate]);

  return null;
};
