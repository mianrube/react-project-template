import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { appConfig } from '@shared/config/app-config';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiBaseUrl,
    prepareHeaders: (headers) => {
      // MSAL token will be injected here later.
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
