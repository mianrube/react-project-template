import type { ALL_FILTER_VALUE } from './tenders.constants';

export const TENDER_MONTH_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type TenderMonth = (typeof TENDER_MONTH_VALUES)[number];

export const TENDER_PARAMETER_VALUES = [
  'annualities',
  'baseBudget',
  'executionTerm',
  'intermediateMilestones',
  'startDate',
] as const;
export type TenderParameter = (typeof TENDER_PARAMETER_VALUES)[number];

export type BooleanFilterValue = typeof ALL_FILTER_VALUE | 'yes' | 'no';

export type TenderExtract = {
  id: string;
  year: number;
  month: TenderMonth;
  client: string;
  tenderReference: string;
  uploadDate: string;
  releaseDate: string;
  parameter: TenderParameter;
  value: string;
  found: boolean;
  hasDiscrepancy: boolean;
  notes: string | null;
};

export type TenderExtractFilters = {
  year: number | typeof ALL_FILTER_VALUE;
  month: TenderMonth | typeof ALL_FILTER_VALUE;
  client: string | typeof ALL_FILTER_VALUE;
  tenderReferences: string[];
  parameter: TenderParameter | typeof ALL_FILTER_VALUE;
  found: BooleanFilterValue;
  discrepancy: BooleanFilterValue;
};

export type TenderExtractSummary = {
  totalCount: number;
  foundCount: number;
  discrepancyCount: number;
  uniqueTenderCount: number;
};

export type TenderExtractListResult = {
  items: TenderExtract[];
  summary: TenderExtractSummary;
};

export type TenderFilterOptions = {
  years: number[];
  months: TenderMonth[];
  clients: string[];
  tenderReferences: string[];
  parameters: TenderParameter[];
};
