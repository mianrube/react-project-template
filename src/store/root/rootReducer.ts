import { combineReducers } from '@reduxjs/toolkit';

import { uiPersistReducer } from '@features/ui/store';

import { baseApi } from '@store/api';

export const rootReducer = combineReducers({
  ui: uiPersistReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
