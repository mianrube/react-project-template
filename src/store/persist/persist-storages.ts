import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';

export type PersistStorageKind = 'local' | 'session';

export const persistStorages: Record<PersistStorageKind, typeof storage> = {
  local: storage,
  session: sessionStorage,
};
