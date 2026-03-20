import type { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { surfacePresets } from '@shared/config/theme';
import { useScopedTranslation } from '@shared/hooks';

import { ALL_FILTER_VALUE, type TenderExtractFilters, type TenderFilterOptions } from '../model';

const BASE_KEY = 'pages.TendersListPage';

const getMonthLabel = (month: number, locale: string): string => {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2026, month - 1, 1));
};

export type TendersFiltersProps = {
  filters: TenderExtractFilters;
  options: TenderFilterOptions;
  isApplying?: boolean;
  onApply: () => void;
  onClear: () => void;
  onFiltersChange: (filters: TenderExtractFilters) => void;
  activeFilterCount: number;
};

export const TendersFilters = ({
  filters,
  options,
  isApplying = false,
  onApply,
  onClear,
  onFiltersChange,
  activeFilterCount,
}: TendersFiltersProps) => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'tenders' });
  const { i18n } = useTranslation('tenders');

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    onFiltersChange({
      ...filters,
      year: value === ALL_FILTER_VALUE ? ALL_FILTER_VALUE : Number(value),
    });
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    onFiltersChange({
      ...filters,
      month:
        value === ALL_FILTER_VALUE
          ? ALL_FILTER_VALUE
          : (Number(value) as TenderExtractFilters['month']),
    });
  };

  const handleClientChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      client: event.target.value,
    });
  };

  const handleParameterChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      parameter: event.target.value as TenderExtractFilters['parameter'],
    });
  };

  const handleFoundChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      found: event.target.value as TenderExtractFilters['found'],
    });
  };

  const handleDiscrepancyChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      discrepancy: event.target.value as TenderExtractFilters['discrepancy'],
    });
  };

  const handleTenderChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;

    onFiltersChange({
      ...filters,
      tenderReferences: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <Paper sx={[surfacePresets.highlightedPanel, { p: 3 }]} variant="outlined">
      <Stack spacing={3}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="h6">{tScoped('filters.title')}</Typography>
            <Typography color="text.secondary" variant="body2">
              {tScoped('filters.subtitle')}
            </Typography>
          </Box>

          <Typography color="text.secondary" variant="body2">
            {tScoped('filters.active', { count: activeFilterCount })}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(4, minmax(0, 1fr))',
            },
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="tenders-filter-year">{tScoped('filters.year')}</InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.year')} />}
              labelId="tenders-filter-year"
              onChange={handleYearChange}
              value={String(filters.year)}
            >
              <MenuItem value={ALL_FILTER_VALUE}>{tScoped('filters.all')}</MenuItem>
              {options.years.map((year) => (
                <MenuItem key={year} value={String(year)}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tenders-filter-month">{tScoped('filters.month')}</InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.month')} />}
              labelId="tenders-filter-month"
              onChange={handleMonthChange}
              value={String(filters.month)}
            >
              <MenuItem value={ALL_FILTER_VALUE}>{tScoped('filters.all')}</MenuItem>
              {options.months.map((month) => (
                <MenuItem key={month} value={String(month)}>
                  {getMonthLabel(month, i18n.language)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tenders-filter-client">{tScoped('filters.client')}</InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.client')} />}
              labelId="tenders-filter-client"
              onChange={handleClientChange}
              value={filters.client}
            >
              <MenuItem value={ALL_FILTER_VALUE}>{tScoped('filters.all')}</MenuItem>
              {options.clients.map((client) => (
                <MenuItem key={client} value={client}>
                  {client}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tenders-filter-parameter">{tScoped('filters.parameter')}</InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.parameter')} />}
              labelId="tenders-filter-parameter"
              onChange={handleParameterChange}
              value={filters.parameter}
            >
              <MenuItem value={ALL_FILTER_VALUE}>{tScoped('filters.all')}</MenuItem>
              {options.parameters.map((parameter) => (
                <MenuItem key={parameter} value={parameter}>
                  {tScoped(`parameters.${parameter}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tenders-filter-tender">{tScoped('filters.tender')}</InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.tender')} />}
              labelId="tenders-filter-tender"
              multiple
              onChange={handleTenderChange}
              renderValue={(selected) =>
                selected.length === 0 ? tScoped('filters.all') : selected.join(', ')
              }
              value={filters.tenderReferences}
            >
              {options.tenderReferences.map((reference) => (
                <MenuItem key={reference} value={reference}>
                  {reference}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tenders-filter-found">{tScoped('filters.found')}</InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.found')} />}
              labelId="tenders-filter-found"
              onChange={handleFoundChange}
              value={filters.found}
            >
              <MenuItem value={ALL_FILTER_VALUE}>{tScoped('filters.all')}</MenuItem>
              <MenuItem value="yes">{tScoped('boolean.yes')}</MenuItem>
              <MenuItem value="no">{tScoped('boolean.no')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tenders-filter-discrepancy">
              {tScoped('filters.discrepancy')}
            </InputLabel>
            <Select
              input={<OutlinedInput label={tScoped('filters.discrepancy')} />}
              labelId="tenders-filter-discrepancy"
              onChange={handleDiscrepancyChange}
              value={filters.discrepancy}
            >
              <MenuItem value={ALL_FILTER_VALUE}>{tScoped('filters.all')}</MenuItem>
              <MenuItem value="yes">{tScoped('boolean.yes')}</MenuItem>
              <MenuItem value="no">{tScoped('boolean.no')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button color="inherit" onClick={onClear} size="large" variant="outlined">
            {tScoped('filters.clear')}
          </Button>
          <Button disabled={isApplying} onClick={onApply} size="large" variant="contained">
            {tScoped('filters.apply')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
