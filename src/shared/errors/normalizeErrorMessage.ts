export const normalizeErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;

  if (typeof error === 'string') return error;

  if (typeof error === 'object' && error !== null) {
    const maybeMessage = 'message' in error ? error.message : undefined;
    if (typeof maybeMessage === 'string') return maybeMessage;
  }

  return 'An unexpected error occurred.';
};