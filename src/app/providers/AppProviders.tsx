import type { PropsWithChildren } from 'react';

import { ProvidersBootstrap } from './ProvidersBootstrap';
import { ProvidersRuntime } from './ProvidersRuntime';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ProvidersBootstrap>
      <ProvidersRuntime>{children}</ProvidersRuntime>
    </ProvidersBootstrap>
  );
};
