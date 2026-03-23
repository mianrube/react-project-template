import { combineReducers } from '@reduxjs/toolkit';

import { appFeedbackReducer } from '@features/app-feedback/store';
import { realtimeReducer } from '@features/realtime/store';
import { uiPersistReducer } from '@features/ui/store';

import { baseApi } from '@store/api';

export const rootReducer = combineReducers({
  ui: uiPersistReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  realtime: realtimeReducer,
  appFeedback: appFeedbackReducer,
});
