import { readEnvString } from './env-readers';

export type AuthConfig = {
  clientId: string;
  tenantId: string;
  authority: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  apiScope: string;
};

export type AppConfig = {
  apiBaseUrl: string;
  environmentName: string;
  auth: AuthConfig;
  signalR: {
    notificationsHubUrl: string;
    chatHubUrl: string;
  };
};

export const appConfig: AppConfig = {
  apiBaseUrl: readEnvString('VITE_API_BASE_URL'),
  environmentName: readEnvString('VITE_ENVIRONMENT_NAME', 'development'),
  auth: {
    clientId: readEnvString('VITE_AUTH_CLIENT_ID'),
    tenantId: readEnvString('VITE_AUTH_TENANT_ID'),
    authority: readEnvString('VITE_AUTH_AUTHORITY'),
    redirectUri: readEnvString('VITE_AUTH_REDIRECT_URI'),
    postLogoutRedirectUri: readEnvString('VITE_AUTH_POST_LOGOUT_REDIRECT_URI'),
    apiScope: readEnvString('VITE_AUTH_API_SCOPE'),
  },
  signalR: {
    notificationsHubUrl: readEnvString('VITE_SIGNALR_NOTIFICATIONS_HUB_URL'),
    chatHubUrl: readEnvString('VITE_SIGNALR_CHAT_HUB_URL'),
  },
};
