import { combineReducers } from '@reduxjs/toolkit';

import { realtimeReducer } from '@features/realtime/store';
import { uiPersistReducer } from '@features/ui/store';

import { baseApi } from '@store/api';

export const rootReducer = combineReducers({
  ui: uiPersistReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  realtime: realtimeReducer,
});
