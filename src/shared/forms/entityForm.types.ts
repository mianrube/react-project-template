import type { FormikHelpers } from 'formik';

import type { EntityFormMode } from './formModes';

export type EntityFormSubmitHandler<TValues> = (
  values: TValues,
  helpers: FormikHelpers<TValues>,
) => void | Promise<void>;

export type EntityFormConfig<TValues> = {
  mode: EntityFormMode;
  initialValues: TValues;
  onSubmit: EntityFormSubmitHandler<TValues>;
};

export type EntityFormProps<TValues> = EntityFormConfig<TValues> & {
  isSubmitting?: boolean;
  isReadOnly?: boolean;
};
