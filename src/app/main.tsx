import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@app';
import { AppProviders } from '@app/providers';

import { bootstrapMsal } from '@shared/auth';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@shared/i18n/i18n';

const bootstrap = async () => {
  await bootstrapMsal();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
};

bootstrap().catch((error) => {
  console.error('App bootstrap failed', error);
});
