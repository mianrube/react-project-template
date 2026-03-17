import { Alert, Snackbar } from '@mui/material';

import { dequeueMessage } from '@features/app-feedback/store';

import { useAppDispatch, useAppSelector } from '@store';

export const GlobalFeedbackSnackbar = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.appFeedback.messages[0]);

  const handleClose = () => {
    dispatch(dequeueMessage());
  };

  if (!message) {
    return null;
  }

  return (
    <Snackbar
      open
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={message.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message.title}
        {message.description ? ` — ${message.description}` : ''}
      </Alert>
    </Snackbar>
  );
};
