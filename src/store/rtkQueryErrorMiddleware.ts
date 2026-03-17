import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';

import { normalizeErrorMessage } from '@shared/errors';

import { enqueueMessage } from '@features/app-feedback/store';

export const rtkQueryErrorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      dispatch(
        enqueueMessage({
          id: crypto.randomUUID(),
          severity: 'error',
          title: 'Request failed',
          description: normalizeErrorMessage(action.payload),
        }),
      );
    }

    return next(action);
  };
