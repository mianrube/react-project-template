import type { TenderExtractFilters } from './tenders.types';

export const ALL_FILTER_VALUE = 'all' as const;

export const DEFAULT_TENDER_EXTRACT_FILTERS: TenderExtractFilters = {
  year: ALL_FILTER_VALUE,
  month: ALL_FILTER_VALUE,
  client: ALL_FILTER_VALUE,
  tenderReferences: [],
  parameter: ALL_FILTER_VALUE,
  found: ALL_FILTER_VALUE,
  discrepancy: ALL_FILTER_VALUE,
};

export const getActiveTenderFilterCount = (filters: TenderExtractFilters): number => {
  let count = 0;

  if (filters.year !== ALL_FILTER_VALUE) {
    count += 1;
  }

  if (filters.month !== ALL_FILTER_VALUE) {
    count += 1;
  }

  if (filters.client !== ALL_FILTER_VALUE) {
    count += 1;
  }

  if (filters.tenderReferences.length > 0) {
    count += 1;
  }

  if (filters.parameter !== ALL_FILTER_VALUE) {
    count += 1;
  }

  if (filters.found !== ALL_FILTER_VALUE) {
    count += 1;
  }

  if (filters.discrepancy !== ALL_FILTER_VALUE) {
    count += 1;
  }

  return count;
};
