import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { baseApi } from '@store/api';

import {
  ALL_FILTER_VALUE,
  type TenderExtract,
  type TenderExtractFilters,
  type TenderExtractListResult,
  type TenderFilterOptions,
} from '../model';

const tenderExtractsMockUrl = new URL('./mocks/tenderExtracts.mock.json', import.meta.url).href;

type FeatureBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

const fetchTenderExtracts = async (
  baseQuery: FeatureBaseQuery,
  api: Parameters<FeatureBaseQuery>[1],
  extraOptions: Parameters<FeatureBaseQuery>[2],
): Promise<{ data: TenderExtract[] } | { error: FetchBaseQueryError }> => {
  const result = await baseQuery({ method: 'GET', url: tenderExtractsMockUrl }, api, extraOptions);

  if (result.error) {
    return { error: result.error };
  }

  return {
    data: ((result.data as TenderExtract[] | undefined) ?? []).slice(),
  };
};

const matchesBooleanFilter = (
  value: boolean,
  filterValue: TenderExtractFilters['found'],
): boolean => {
  if (filterValue === ALL_FILTER_VALUE) {
    return true;
  }

  return filterValue === 'yes' ? value : !value;
};

const filterTenderExtracts = (
  items: TenderExtract[],
  filters: TenderExtractFilters,
): TenderExtract[] => {
  return items.filter((item) => {
    const matchesYear = filters.year === ALL_FILTER_VALUE || item.year === filters.year;
    const matchesMonth = filters.month === ALL_FILTER_VALUE || item.month === filters.month;
    const matchesClient = filters.client === ALL_FILTER_VALUE || item.client === filters.client;
    const matchesTender =
      filters.tenderReferences.length === 0 ||
      filters.tenderReferences.includes(item.tenderReference);
    const matchesParameter =
      filters.parameter === ALL_FILTER_VALUE || item.parameter === filters.parameter;
    const matchesFound = matchesBooleanFilter(item.found, filters.found);
    const matchesDiscrepancy = matchesBooleanFilter(item.hasDiscrepancy, filters.discrepancy);

    return (
      matchesYear &&
      matchesMonth &&
      matchesClient &&
      matchesTender &&
      matchesParameter &&
      matchesFound &&
      matchesDiscrepancy
    );
  });
};

const createSummary = (items: TenderExtract[]): TenderExtractListResult['summary'] => {
  return {
    totalCount: items.length,
    foundCount: items.filter((item) => item.found).length,
    discrepancyCount: items.filter((item) => item.hasDiscrepancy).length,
    uniqueTenderCount: new Set(items.map((item) => item.tenderReference)).size,
  };
};

const createFilterOptions = (items: TenderExtract[]): TenderFilterOptions => {
  return {
    years: Array.from(new Set(items.map((item) => item.year))).sort((left, right) => right - left),
    months: Array.from(new Set(items.map((item) => item.month))).sort(
      (left, right) => left - right,
    ),
    clients: Array.from(new Set(items.map((item) => item.client))).sort((left, right) =>
      left.localeCompare(right),
    ),
    tenderReferences: Array.from(new Set(items.map((item) => item.tenderReference))).sort(
      (left, right) => left.localeCompare(right),
    ),
    parameters: Array.from(new Set(items.map((item) => item.parameter))).sort((left, right) =>
      left.localeCompare(right),
    ) as TenderFilterOptions['parameters'],
  };
};

export const tendersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenderExtracts: builder.query<TenderExtractListResult, TenderExtractFilters>({
      queryFn: async (filters, api, extraOptions, baseQuery) => {
        const result = await fetchTenderExtracts(baseQuery, api, extraOptions);

        if ('error' in result) {
          return result;
        }

        const items = filterTenderExtracts(result.data, filters);

        return {
          data: {
            items,
            summary: createSummary(items),
          },
        };
      },
    }),
    getTenderFilterOptions: builder.query<TenderFilterOptions, void>({
      queryFn: async (_arg, api, extraOptions, baseQuery) => {
        const result = await fetchTenderExtracts(baseQuery, api, extraOptions);

        if ('error' in result) {
          return result;
        }

        return {
          data: createFilterOptions(result.data),
        };
      },
    }),
  }),
});

export const { useGetTenderExtractsQuery, useGetTenderFilterOptionsQuery } = tendersApi;
