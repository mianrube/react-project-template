import { type HubConnection, HubConnectionState } from '@microsoft/signalr';

export const startConnectionSafely = async (connection: HubConnection): Promise<void> => {
  if (connection.state === HubConnectionState.Connected) return;
  if (connection.state === HubConnectionState.Connecting) return;

  await connection.start();
};
