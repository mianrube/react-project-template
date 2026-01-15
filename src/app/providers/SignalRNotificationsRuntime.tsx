import { useEffect, useRef } from 'react';

import type { HubConnection } from '@microsoft/signalr';
import { LogLevel } from '@microsoft/signalr';

import { appConfig } from '@shared/config/app-config';
import { createHubConnection, startConnectionSafely } from '@shared/realtime';

import { setLastNotification, setNotificationsConnected } from '@features/realtime/store';

import { useAppDispatch } from '@store';

export const SignalRNotificationsRuntime = () => {
  const dispatch = useAppDispatch();
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    const connection = createHubConnection({
      hubUrl: appConfig.signalR.notificationsHubUrl,
      logLevel: LogLevel.Information,
    });

    connectionRef.current = connection;

    connection.onreconnecting(() => dispatch(setNotificationsConnected(false)));
    connection.onreconnected(() => dispatch(setNotificationsConnected(true)));
    connection.onclose(() => dispatch(setNotificationsConnected(false)));

    // Example event: "NotificationReceived"
    connection.on('NotificationReceived', (payload: unknown) => {
      dispatch(
        setLastNotification({
          name: 'NotificationReceived',
          payload,
          atIso: new Date().toISOString(),
        }),
      );
    });

    void (async () => {
      try {
        await startConnectionSafely(connection);
        dispatch(setNotificationsConnected(true));
      } catch {
        dispatch(setNotificationsConnected(false));
      }
    })();

    return () => {
      connection.stop().catch(() => undefined);
      connectionRef.current = null;
    };
  }, [dispatch]);

  return null;
};
