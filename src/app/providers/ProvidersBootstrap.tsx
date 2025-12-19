import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@store';

export const ProvidersBootstrap = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>{children}</BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
