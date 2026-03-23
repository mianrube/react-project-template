import { Button, Chip, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import {
  type EntityFormProps,
  FormikSwitchField,
  FormikTextField,
  isCreateFormMode,
} from '@shared/forms';
import { useScopedTranslation } from '@shared/hooks';

import { createFaqFormSchema, FAQ_CATEGORY_VALUES, type FaqFormValues } from '../model';

export type FaqFormProps = EntityFormProps<FaqFormValues> & {
  description: string;
  onCancel?: () => void;
  title: string;
};

export const FaqForm = ({
  description,
  initialValues,
  mode,
  onCancel,
  onSubmit,
  title,
}: FaqFormProps) => {
  const { tScoped } = useScopedTranslation('components.FaqForm', { ns: 'faqs' });

  const submitLabel = isCreateFormMode(mode)
    ? tScoped('actions.createSubmit')
    : tScoped('actions.editSubmit');

  const modeLabel = isCreateFormMode(mode) ? tScoped('mode.create') : tScoped('mode.edit');

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }} variant="outlined">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createFaqFormSchema(tScoped)}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Chip label={modeLabel} size="small" sx={{ alignSelf: 'flex-start' }} />
                <Typography variant="h5">{title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {description}
                </Typography>
              </Stack>

              <FormikTextField
                fullWidth
                helperText={tScoped('fields.question.helperText')}
                label={tScoped('fields.question.label')}
                name="question"
                placeholder={tScoped('fields.question.placeholder')}
              />

              <FormikTextField
                fullWidth
                helperText={tScoped('fields.answer.helperText')}
                label={tScoped('fields.answer.label')}
                minRows={4}
                multiline
                name="answer"
                placeholder={tScoped('fields.answer.placeholder')}
              />

              <FormikTextField
                fullWidth
                helperText={tScoped('fields.category.helperText')}
                label={tScoped('fields.category.label')}
                name="category"
                select
              >
                {FAQ_CATEGORY_VALUES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {tScoped(`fields.category.options.${category}`)}
                  </MenuItem>
                ))}
              </FormikTextField>

              <FormikSwitchField
                helperText={tScoped('fields.isPublished.helperText')}
                label={tScoped('fields.isPublished.label')}
                name="isPublished"
              />

              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                {onCancel ? (
                  <Button color="inherit" disabled={isSubmitting} onClick={onCancel} variant="text">
                    {tScoped('actions.cancel')}
                  </Button>
                ) : null}

                <Button disabled={isSubmitting} type="submit" variant="contained">
                  {submitLabel}
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
