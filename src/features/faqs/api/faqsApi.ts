import { createCrudResourceUrls } from '@shared/config/app-config';

import { baseApi } from '@store/api';

import type { FaqFormValues, FaqItem } from '../model';

type UpdateFaqArg = {
  id: string;
  values: FaqFormValues;
};

const faqResourceUrls = createCrudResourceUrls('faqs', '/faqs');

const sortFaqs = (items: FaqItem[]): FaqItem[] => {
  return [...items].sort((left, right) => {
    return right.updatedAtIso.localeCompare(left.updatedAtIso);
  });
};

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FaqItem[], void>({
      query: () => faqResourceUrls.collection,
      transformResponse: (response: FaqItem[]) => {
        return sortFaqs(response ?? []);
      },
      providesTags: (result) => {
        if (!result) {
          return [{ type: 'Faq' as const, id: 'LIST' }];
        }

        return [
          { type: 'Faq' as const, id: 'LIST' },
          ...result.map((faq) => ({ type: 'Faq' as const, id: faq.id })),
        ];
      },
    }),
    createFaq: builder.mutation<FaqItem, FaqFormValues>({
      query: (values) => {
        return {
          url: faqResourceUrls.collection,
          method: 'POST',
          body: {
            ...values,
            id: `faq-${crypto.randomUUID()}`,
            updatedAtIso: new Date().toISOString(),
          } satisfies FaqItem,
        };
      },
      invalidatesTags: [{ type: 'Faq', id: 'LIST' }],
    }),
    updateFaq: builder.mutation<FaqItem, UpdateFaqArg>({
      query: ({ id, values }) => {
        return {
          url: faqResourceUrls.item(id),
          method: 'PUT',
          body: {
            ...values,
            id,
            updatedAtIso: new Date().toISOString(),
          } satisfies FaqItem,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Faq', id: 'LIST' },
        { type: 'Faq', id: arg.id },
      ],
    }),
    deleteFaq: builder.mutation<{ id: string }, string>({
      query: (id) => {
        return {
          url: faqResourceUrls.item(id),
          method: 'DELETE',
        };
      },
      transformResponse: (_response: unknown, _meta, id) => {
        return { id };
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Faq', id: 'LIST' },
        { type: 'Faq', id },
      ],
    }),
  }),
});

export const { useCreateFaqMutation, useDeleteFaqMutation, useGetFaqsQuery, useUpdateFaqMutation } =
  faqsApi;
