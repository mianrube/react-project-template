import { baseApi } from '@store/api';

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ping: builder.query<{ ok: boolean }, void>({
      query: () => '/ping',
    }),
  }),
});

export const { usePingQuery } = homeApi;
