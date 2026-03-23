export const FAQ_CATEGORY_VALUES = ['general', 'billing', 'technical'] as const;

export type FaqCategory = (typeof FAQ_CATEGORY_VALUES)[number];

export type FaqFormValues = {
  answer: string;
  category: FaqCategory;
  isPublished: boolean;
  question: string;
};

export type FaqItem = FaqFormValues & {
  id: string;
  updatedAtIso: string;
};

export const DEFAULT_FAQ_FORM_VALUES: FaqFormValues = {
  answer: '',
  category: 'general',
  isPublished: false,
  question: '',
};

export const toFaqFormValues = (faq: FaqItem): FaqFormValues => {
  return {
    answer: faq.answer,
    category: faq.category,
    isPublished: faq.isPublished,
    question: faq.question,
  };
};

export const matchesFaqSearch = (faq: FaqItem, searchQuery: string): boolean => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [faq.question, faq.answer, faq.category].some((value) => {
    return value.toLowerCase().includes(normalizedQuery);
  });
};
