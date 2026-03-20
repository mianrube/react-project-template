import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

import { surfacePresets } from '@shared/config/theme';
import { useScopedTranslation } from '@shared/hooks';

import type { TenderExtract } from '../model';

const BASE_KEY = 'pages.TendersListPage';

const formatDate = (value: string, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
};

export type TendersDataGridProps = {
  items: TenderExtract[];
  loading?: boolean;
};

export const TendersDataGrid = ({ items, loading = false }: TendersDataGridProps) => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'tenders' });
  const { i18n } = useTranslation('tenders');

  const columns: GridColDef<TenderExtract>[] = [
    {
      field: 'year',
      headerName: tScoped('grid.columns.year'),
      width: 90,
    },
    {
      field: 'client',
      headerName: tScoped('grid.columns.client'),
      minWidth: 220,
      flex: 1,
    },
    {
      field: 'tenderReference',
      headerName: tScoped('grid.columns.tender'),
      minWidth: 160,
      flex: 0.8,
    },
    {
      field: 'uploadDate',
      headerName: tScoped('grid.columns.uploadDate'),
      minWidth: 130,
      valueFormatter: (value) => formatDate(String(value), i18n.language),
    },
    {
      field: 'releaseDate',
      headerName: tScoped('grid.columns.releaseDate'),
      minWidth: 130,
      valueFormatter: (value) => formatDate(String(value), i18n.language),
    },
    {
      field: 'parameter',
      headerName: tScoped('grid.columns.parameter'),
      minWidth: 220,
      flex: 1,
      renderCell: ({ row }) => tScoped(`parameters.${row.parameter}`),
    },
    {
      field: 'value',
      headerName: tScoped('grid.columns.value'),
      minWidth: 340,
      flex: 1.6,
      renderCell: ({ row }) => (
        <Box sx={{ py: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>{row.value}</Box>
      ),
    },
    {
      field: 'found',
      headerName: tScoped('grid.columns.found'),
      minWidth: 140,
      renderCell: ({ row }) => (
        <Chip
          color={row.found ? 'success' : 'default'}
          label={row.found ? tScoped('boolean.yes') : tScoped('boolean.no')}
          size="small"
          variant={row.found ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'hasDiscrepancy',
      headerName: tScoped('grid.columns.discrepancy'),
      minWidth: 150,
      renderCell: ({ row }) => (
        <Chip
          color={row.hasDiscrepancy ? 'warning' : 'success'}
          label={
            row.hasDiscrepancy
              ? tScoped('statuses.hasDiscrepancy')
              : tScoped('statuses.noDiscrepancy')
          }
          size="small"
          variant={row.hasDiscrepancy ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'notes',
      headerName: tScoped('grid.columns.notes'),
      minWidth: 260,
      flex: 1.2,
      renderCell: ({ row }) => (
        <Box sx={{ py: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {row.notes ?? tScoped('grid.noNotes')}
        </Box>
      ),
    },
  ];

  return (
    <Paper sx={[surfacePresets.roundedPanel, { overflow: 'hidden' }]} variant="outlined">
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Typography variant="h6">{tScoped('grid.title')}</Typography>
        <Typography color="text.secondary" variant="body2">
          {tScoped('grid.subtitle')}
        </Typography>
      </Stack>

      <Box sx={{ minWidth: 0 }}>
        <DataGrid
          autoHeight
          columnHeaderHeight={54}
          columns={columns}
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          rows={items}
        />
      </Box>
    </Paper>
  );
};
