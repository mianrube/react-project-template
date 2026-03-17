import { useEffect } from 'react';

import { normalizeErrorMessage } from '@shared/errors';

import { enqueueMessage } from '@features/app-feedback/store';

import { useAppDispatch } from '@store';

export const GlobalErrorRuntime = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      dispatch(
        enqueueMessage({
          id: crypto.randomUUID(),
          severity: 'error',
          title: 'Unexpected error',
          description: normalizeErrorMessage(event.error ?? event.message),
        }),
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      dispatch(
        enqueueMessage({
          id: crypto.randomUUID(),
          severity: 'error',
          title: 'Unhandled async error',
          description: normalizeErrorMessage(event.reason),
        }),
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [dispatch]);

  return null;
};
