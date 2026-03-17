import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { baseApi } from '@store/api';

import { rootReducer } from './root';
import { rtkQueryErrorMiddleware } from './rtkQueryErrorMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware, rtkQueryErrorMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
