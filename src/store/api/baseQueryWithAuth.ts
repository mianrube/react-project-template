import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken } from '@shared/auth';
import { appConfig, isMockApiUrl } from '@shared/config/app-config';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: appConfig.apiBaseUrl,
});

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const requestUrl = typeof args === 'string' ? args : args.url;
  const shouldAttachAuth = !isMockApiUrl(requestUrl);
  const token = shouldAttachAuth ? await getAccessToken() : null;

  const argsWithAuth =
    typeof args === 'string'
      ? { url: args, headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      : {
          ...args,
          headers: {
            ...(args.headers ?? {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        };

  return rawBaseQuery(argsWithAuth, api, extraOptions);
};
