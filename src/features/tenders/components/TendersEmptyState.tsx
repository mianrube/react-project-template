import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Paper, Stack, Typography } from '@mui/material';

import { surfacePresets } from '@shared/config/theme';
import { useScopedTranslation } from '@shared/hooks';

const BASE_KEY = 'pages.TendersListPage';

export const TendersEmptyState = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'tenders' });

  return (
    <Paper sx={[surfacePresets.roundedPanel, { p: 4, textAlign: 'center' }]} variant="outlined">
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <FilterAltOffIcon color="action" fontSize="large" />
        <Typography variant="h6">{tScoped('states.emptyTitle')}</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 480 }}>
          {tScoped('states.emptyDescription')}
        </Typography>
      </Stack>
    </Paper>
  );
};
