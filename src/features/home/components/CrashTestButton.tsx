import { useState } from 'react';

import { Button } from '@mui/material';

export const CrashTestButton = () => {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error('Crash after click');
  }

  return (
    <Button variant="outlined" color="error" onClick={() => setCrash(true)}>
      Crash test
    </Button>
  );
};
