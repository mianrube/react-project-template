import type { HubConnection } from '@microsoft/signalr';

import { appConfig } from '@shared/config/app-config';
import { createHubConnection, startConnectionSafely } from '@shared/realtime';

import type { ChatStreamEvents } from './chatStreamEvents';

type ChatStreamHandlers = Partial<{
  onChunk: (payload: ChatStreamEvents['ChunkReceived']) => void;
  onReferences: (payload: ChatStreamEvents['ReferencesReceived']) => void;
  onDone: (payload: ChatStreamEvents['StreamCompleted']) => void;
  onError: (payload: ChatStreamEvents['StreamFailed']) => void;
}>;

export type ChatStreamSession = {
  connection: HubConnection;
  start: (startMethod: string, ...args: unknown[]) => Promise<void>;
  stop: () => Promise<void>;
};

type CreateChatStreamSessionArgs = {
  /**
   * Parameters sent as query string (conversationId, requestId, etc.)
   * Use only what your backend expects.
   */
  query?: Record<string, string | number | boolean | undefined>;
};

export const createChatStreamSession = (
  args: CreateChatStreamSessionArgs,
  handlers: ChatStreamHandlers,
): ChatStreamSession => {
  const connection = createHubConnection({
    hubUrl: appConfig.signalR.chatHubUrl,
    query: args.query,
  });

  if (handlers.onChunk) connection.on('ChunkReceived', handlers.onChunk);
  if (handlers.onReferences) connection.on('ReferencesReceived', handlers.onReferences);
  if (handlers.onDone) connection.on('StreamCompleted', handlers.onDone);
  if (handlers.onError) connection.on('StreamFailed', handlers.onError);

  const start = async (startMethod: string, ...startArgs: unknown[]) => {
    await startConnectionSafely(connection);
    await connection.invoke(startMethod, ...startArgs);
  };

  const stop = async () => {
    try {
      if (handlers.onChunk) connection.off('ChunkReceived', handlers.onChunk);
      if (handlers.onReferences) connection.off('ReferencesReceived', handlers.onReferences);
      if (handlers.onDone) connection.off('StreamCompleted', handlers.onDone);
      if (handlers.onError) connection.off('StreamFailed', handlers.onError);
    } finally {
      await connection.stop();
    }
  };

  return { connection, start, stop };
};
