export type ChatStreamEvents = {
  ChunkReceived: { messageId: string; chunk: string };
  ReferencesReceived: {
    messageId: string;
    references: Array<{ id: string; title: string; url?: string }>;
  };
  StreamCompleted: { messageId: string };
  StreamFailed: { messageId: string; error: string };
};
