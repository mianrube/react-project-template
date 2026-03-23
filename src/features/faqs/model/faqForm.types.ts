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

export const EXISTING_FAQ_FORM_VALUES: FaqFormValues = {
  answer:
    'Open the notification center from the top bar and choose the digest option to group similar notices into a single summary.',
  category: 'technical',
  isPublished: true,
  question: 'How can I reduce the number of repeated notifications?',
};

export const INITIAL_FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-notifications-digest',
    question: 'How can I reduce the number of repeated notifications?',
    answer:
      'Open the notification center from the top bar and choose the digest option to group similar notices into a single summary.',
    category: 'technical',
    isPublished: true,
    updatedAtIso: '2026-03-20T09:15:00.000Z',
  },
  {
    id: 'faq-billing-invoices',
    question: 'Where can I download the latest invoice for my subscription?',
    answer:
      'Go to Billing, open the Invoices tab, and download the document associated with the billing period you need.',
    category: 'billing',
    isPublished: true,
    updatedAtIso: '2026-03-18T16:40:00.000Z',
  },
  {
    id: 'faq-access-requests',
    question: 'How do I request access for a new team member?',
    answer:
      'Open the workspace settings, add the new user in the access section, and assign the role that matches their responsibilities.',
    category: 'general',
    isPublished: true,
    updatedAtIso: '2026-03-14T11:05:00.000Z',
  },
  {
    id: 'faq-maintenance-window',
    question: 'How will users be informed about the next maintenance window?',
    answer:
      'Publish the maintenance notice, schedule it for the desired date, and enable the banner so users see it before the interruption starts.',
    category: 'general',
    isPublished: false,
    updatedAtIso: '2026-03-11T08:30:00.000Z',
  },
];

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
