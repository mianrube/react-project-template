import { startTransition, useState } from 'react';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { ErrorState, LoadingState } from '@shared/components';
import { useScopedTranslation } from '@shared/hooks';

import { useGetTenderExtractsQuery, useGetTenderFilterOptionsQuery } from '../api';
import {
  TendersDataGrid,
  TendersEmptyState,
  TendersFilters,
  TendersSummaryCards,
} from '../components';
import {
  DEFAULT_TENDER_EXTRACT_FILTERS,
  getActiveTenderFilterCount,
  type TenderExtractFilters,
} from '../model';

const BASE_KEY = 'pages.TendersListPage';

export const TendersListPage = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'tenders' });

  const [draftFilters, setDraftFilters] = useState<TenderExtractFilters>(
    DEFAULT_TENDER_EXTRACT_FILTERS,
  );
  const [appliedFilters, setAppliedFilters] = useState<TenderExtractFilters>(
    DEFAULT_TENDER_EXTRACT_FILTERS,
  );

  const {
    data: listResult,
    isError: isListError,
    isFetching: isListFetching,
    isLoading: isListLoading,
    refetch: refetchList,
  } = useGetTenderExtractsQuery(appliedFilters);
  const {
    data: filterOptions,
    isError: isOptionsError,
    isFetching: isOptionsFetching,
    isLoading: isOptionsLoading,
    refetch: refetchOptions,
  } = useGetTenderFilterOptionsQuery();

  const isInitialLoading = (isListLoading && !listResult) || (isOptionsLoading && !filterOptions);
  const isRefreshing = isListFetching || isOptionsFetching;
  const activeFilterCount = getActiveTenderFilterCount(draftFilters);

  const handleApplyFilters = () => {
    startTransition(() => {
      setAppliedFilters({ ...draftFilters, tenderReferences: [...draftFilters.tenderReferences] });
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      setDraftFilters(DEFAULT_TENDER_EXTRACT_FILTERS);
      setAppliedFilters(DEFAULT_TENDER_EXTRACT_FILTERS);
    });
  };

  const handleRetry = () => {
    void refetchList();
    void refetchOptions();
  };

  if (isInitialLoading) {
    return <LoadingState label={tScoped('states.loading')} />;
  }

  if (isListError || isOptionsError || !filterOptions || !listResult) {
    return (
      <ErrorState
        description={tScoped('states.errorDescription')}
        onRetry={handleRetry}
        title={tScoped('states.errorTitle')}
      />
    );
  }

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        sx={(theme) => ({
          border: 1,
          borderColor: 'divider',
          borderRadius: 5,
          overflow: 'hidden',
          p: { xs: 3, md: 4 },
          position: 'relative',
          background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.96)} 42%, ${theme.palette.background.paper} 100%)`,
        })}
      >
        <Stack spacing={2} sx={{ maxWidth: 840 }}>
          <Chip
            icon={<AssignmentOutlinedIcon />}
            label={tScoped('eyebrow')}
            sx={{ alignSelf: 'flex-start' }}
            variant="outlined"
          />
          <Typography variant="h3">{tScoped('title')}</Typography>
          <Typography color="text.secondary" variant="body1">
            {tScoped('description')}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {tScoped('filters.results', { count: listResult.summary.totalCount })}
          </Typography>
        </Stack>
      </Box>

      <TendersSummaryCards summary={listResult.summary} />

      <TendersFilters
        activeFilterCount={activeFilterCount}
        filters={draftFilters}
        isApplying={isRefreshing}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        onFiltersChange={setDraftFilters}
        options={filterOptions}
      />

      {listResult.items.length === 0 ? (
        <TendersEmptyState />
      ) : (
        <TendersDataGrid items={listResult.items} loading={isRefreshing} />
      )}
    </Stack>
  );
};
