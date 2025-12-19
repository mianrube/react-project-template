import { persistReducer } from 'redux-persist';

import { createPersistConfig } from '@store/persist';

import type { UiState } from './uiSlice';
import { uiReducer } from './uiSlice';

export const uiPersistReducer = persistReducer(
  createPersistConfig<UiState>({
    key: 'ui',
    storageKind: 'local',
    whitelist: ['themeMode', 'language'],
  }),
  uiReducer,
);
