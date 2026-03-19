import type { PersistConfig, PersistedState, PersistMigrate } from 'redux-persist';

import { type PersistStorageKind, persistStorages } from './persist-storages';
import { APP_STORAGE_VERSION } from './storage-version';

type CreatePersistConfigArgs<S> = {
  key: string;
  storageKind: PersistStorageKind;
  whitelist: Array<keyof S>;
};

export const createPersistConfig = <S>({
  key,
  storageKind,
  whitelist,
}: CreatePersistConfigArgs<S>): PersistConfig<S> => {
  return {
    key,
    version: APP_STORAGE_VERSION,
    storage: persistStorages[storageKind],
    whitelist: whitelist as string[],
    /**
     * Default strategy: keep persisted state.
     * If we detect a version mismatch, return undefined to force rehydration with initial state.
     */
    migrate: (async (state: unknown, currentVersion: number): Promise<PersistedState> => {
      const isRecord = (value: unknown): value is Record<string, unknown> =>
        typeof value === 'object' && value !== null;

      if (!isRecord(state)) return state as PersistedState;

      const persistMeta = state['_persist'];

      let incomingVersion: number | undefined;
      if (isRecord(persistMeta) && typeof persistMeta['version'] === 'number') {
        incomingVersion = persistMeta['version'];
      } else if (typeof persistMeta === 'string') {
        try {
          const parsed = JSON.parse(persistMeta) as unknown;
          if (isRecord(parsed) && typeof parsed['version'] === 'number') {
            incomingVersion = parsed['version'];
          }
        } catch {
          // Ignore parse errors and keep state
        }
      }

      if (typeof incomingVersion === 'number' && incomingVersion !== currentVersion) {
        // redux-persist treats `undefined` as "use initial state".
        return undefined as unknown as PersistedState;
      }

      return state as PersistedState;
    }) as PersistMigrate,
  };
};
