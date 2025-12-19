import type { PersistConfig } from 'redux-persist';

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
     * Default strategy: reset on version change.
     * Return undefined to force redux-persist to rehydrate with initial state.
     */
    migrate: async () => undefined,
  };
};
