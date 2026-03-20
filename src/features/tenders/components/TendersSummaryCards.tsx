import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { ReactElement } from 'react';

import { surfacePresets } from '@shared/config/theme';
import { useScopedTranslation } from '@shared/hooks';

import type { TenderExtractListResult } from '../model';

const BASE_KEY = 'pages.TendersListPage';

type SummaryCardConfig = {
  id: string;
  icon: ReactElement;
  value: number;
};

export type TendersSummaryCardsProps = {
  summary: TenderExtractListResult['summary'];
};

export const TendersSummaryCards = ({ summary }: TendersSummaryCardsProps) => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'tenders' });

  const cards: SummaryCardConfig[] = [
    {
      id: 'totalCount',
      icon: <DescriptionOutlinedIcon color="primary" />,
      value: summary.totalCount,
    },
    {
      id: 'foundCount',
      icon: <FindInPageOutlinedIcon color="success" />,
      value: summary.foundCount,
    },
    {
      id: 'discrepancyCount',
      icon: <WarningAmberOutlinedIcon color="warning" />,
      value: summary.discrepancyCount,
    },
    {
      id: 'uniqueTenderCount',
      icon: <FolderOpenOutlinedIcon color="secondary" />,
      value: summary.uniqueTenderCount,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          xl: 'repeat(4, minmax(0, 1fr))',
        },
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.id}
          sx={[
            surfacePresets.roundedPanel,
            (theme) => ({
              p: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.92),
            }),
          ]}
          variant="outlined"
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={(theme) => ({
                alignItems: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                borderRadius: 3,
                display: 'inline-flex',
                justifyContent: 'center',
                minHeight: 48,
                minWidth: 48,
              })}
            >
              {card.icon}
            </Box>

            <Stack spacing={0.5}>
              <Typography color="text.secondary" variant="body2">
                {tScoped(`stats.${card.id}`)}
              </Typography>
              <Typography variant="h4">{card.value}</Typography>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};
