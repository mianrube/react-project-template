import type { TFunction } from 'i18next';
import * as yup from 'yup';

import { FAQ_CATEGORY_VALUES, type FaqCategory, type FaqFormValues } from './faqForm.types';

export const createFaqFormSchema = (tScoped: TFunction): yup.ObjectSchema<FaqFormValues> => {
  return yup.object({
    answer: yup
      .string()
      .trim()
      .min(20, tScoped('validation.answerMin'))
      .max(1200, tScoped('validation.answerMax'))
      .required(tScoped('validation.answerRequired')),
    category: yup
      .mixed<FaqCategory>()
      .oneOf([...FAQ_CATEGORY_VALUES], tScoped('validation.categoryRequired'))
      .required(tScoped('validation.categoryRequired')),
    isPublished: yup.boolean().required(),
    question: yup
      .string()
      .trim()
      .min(10, tScoped('validation.questionMin'))
      .max(160, tScoped('validation.questionMax'))
      .required(tScoped('validation.questionRequired')),
  });
};
