import { appConfig } from '@shared/config/app-config';

export const loginRequest = {
  scopes: [appConfig.auth.apiScope],
};

export const apiTokenRequest = {
  scopes: [appConfig.auth.apiScope],
};
