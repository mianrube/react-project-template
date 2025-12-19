import { InteractionRequiredAuthError } from '@azure/msal-browser';

import { apiTokenRequest } from '@shared/auth/authRequests';
import { msalInstance } from '@shared/auth/msalInstance';

const INTERACTION_FLAG_KEY = 'auth.interactionInProgress';

const setInteractionFlag = () => {
  sessionStorage.setItem(INTERACTION_FLAG_KEY, '1');
};

const clearInteractionFlag = () => {
  sessionStorage.removeItem(INTERACTION_FLAG_KEY);
};

const hasInteractionFlag = (): boolean => {
  return sessionStorage.getItem(INTERACTION_FLAG_KEY) === '1';
};

export const getAccessToken = async (): Promise<string | null> => {
  const account = msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0] ?? null;

  if (!account) return null;

  try {
    const result = await msalInstance.acquireTokenSilent({
      ...apiTokenRequest,
      account,
    });

    // Token obtained silently - clear any stale interaction flag
    clearInteractionFlag();

    return result.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      /**
       * We need user interaction (consent, MFA, expired session, etc.).
       * We cannot complete the request here without redirecting.
       * Use a one-shot flag to avoid infinite redirect loops.
       */
      if (!hasInteractionFlag()) {
        setInteractionFlag();
        void msalInstance.loginRedirect(apiTokenRequest);
      }

      return null;
    }

    throw error;
  }
};
