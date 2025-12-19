import type { AuthenticationResult } from '@azure/msal-browser';

import { msalInstance } from './msalInstance';

export const bootstrapMsal = async (): Promise<void> => {
  await msalInstance.initialize();

  const result = (await msalInstance.handleRedirectPromise()) as AuthenticationResult | null;

  if (result?.account) {
    msalInstance.setActiveAccount(result.account);
  } else {
    const active = msalInstance.getActiveAccount();
    if (!active) {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
    }
  }
};
