/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENVIRONMENT_NAME?: string;

  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_AUTH_TENANT_ID: string;
  readonly VITE_AUTH_AUTHORITY: string;
  readonly VITE_AUTH_REDIRECT_URI: string;
  readonly VITE_AUTH_POST_LOGOUT_REDIRECT_URI: string;
  readonly VITE_AUTH_API_SCOPE: string;

  readonly VITE_SIGNALR_NOTIFICATIONS_HUB_URL: string;
  readonly VITE_SIGNALR_CHAT_HUB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
