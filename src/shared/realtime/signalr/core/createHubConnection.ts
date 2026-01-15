import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { getAccessToken } from '@shared/auth';

import { buildHubUrl } from './buildHubUrl';

type CreateHubConnectionArgs = {
  hubUrl: string;
  query?: Record<string, string | number | boolean | undefined>;
  logLevel?: LogLevel;
  reconnectDelaysMs?: number[];
};

export const createHubConnection = ({
  hubUrl,
  query,
  logLevel = LogLevel.Information,
  reconnectDelaysMs = [0, 2000, 5000, 10000],
}: CreateHubConnectionArgs): HubConnection => {
  const url = buildHubUrl(hubUrl, query);

  return new HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: async () => (await getAccessToken()) ?? '',
    })
    .withAutomaticReconnect(reconnectDelaysMs)
    .configureLogging(logLevel)
    .build();
};
