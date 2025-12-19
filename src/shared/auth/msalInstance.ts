import { EventType, PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from './msalConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const account = (event.payload as { account?: unknown }).account;
    if (account && typeof account === 'object') {
      msalInstance.setActiveAccount(account as never);
    }
  }
});
