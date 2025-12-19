import type { Configuration } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-browser';

import { appConfig } from '@shared/config/app-config';

export const msalConfig: Configuration = {
  auth: {
    clientId: appConfig.auth.clientId,
    authority: appConfig.auth.authority,
    redirectUri: appConfig.auth.redirectUri,
    postLogoutRedirectUri: appConfig.auth.postLogoutRedirectUri,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    // MSAL recommends configuring cache; storage choice is app-dependent.
    // Start with sessionStorage for safety; switch to localStorage if you need SSO across tabs.
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false,
    },
  },
};
