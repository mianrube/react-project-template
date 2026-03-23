import { readEnvString, readEnvStringArray } from './env-readers';

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
  mockApi: {
    baseUrl: string;
    resources: string[];
  };
  auth: AuthConfig;
  signalR: {
    notificationsHubUrl: string;
    chatHubUrl: string;
  };
};

export const appConfig: AppConfig = {
  apiBaseUrl: readEnvString('VITE_API_BASE_URL'),
  environmentName: readEnvString('VITE_ENVIRONMENT_NAME', 'development'),
  mockApi: {
    baseUrl: readEnvString('VITE_MOCK_API_BASE_URL', ''),
    resources: readEnvStringArray('VITE_MOCK_API_RESOURCES', ',', []),
  },
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

export type MockApiResource = 'faqs' | 'tenders';

export type CrudMockResourceUrls = {
  collection: string;
  item: (id: string) => string;
};

const normalizeBaseUrl = (value: string): string => {
  return value.replace(/\/+$/, '');
};

const normalizedMockApiBaseUrl = normalizeBaseUrl(appConfig.mockApi.baseUrl);

export const isMockApiEnabledForResource = (resource: MockApiResource): boolean => {
  return (
    normalizedMockApiBaseUrl !== '' &&
    appConfig.mockApi.resources.some((configuredResource) => configuredResource === resource)
  );
};

export const resolveFeatureApiUrl = (resource: MockApiResource, path: string): string => {
  if (!isMockApiEnabledForResource(resource)) {
    return path;
  }

  return new URL(path.replace(/^\//, ''), `${normalizedMockApiBaseUrl}/`).toString();
};

export const createCrudMockResourceUrls = (
  resource: MockApiResource,
  collectionPath: string,
): CrudMockResourceUrls => {
  return {
    collection: resolveFeatureApiUrl(resource, collectionPath),
    item: (id: string) => {
      return resolveFeatureApiUrl(resource, `${collectionPath.replace(/\/$/, '')}/${id}`);
    },
  };
};

export const isMockApiUrl = (url: string): boolean => {
  return /^https?:\/\//i.test(url) && normalizedMockApiBaseUrl !== ''
    ? url.startsWith(normalizedMockApiBaseUrl)
    : false;
};
