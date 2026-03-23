import { TextField, type TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import type { ReactNode } from 'react';

export type FormikTextFieldProps = Omit<
  TextFieldProps,
  'error' | 'helperText' | 'name' | 'onBlur' | 'onChange' | 'value'
> & {
  helperText?: ReactNode;
  name: string;
};

export const FormikTextField = ({ helperText, name, ...props }: FormikTextFieldProps) => {
  const [field, meta] = useField(name);

  const showError = meta.touched && Boolean(meta.error);
  const resolvedHelperText = showError ? meta.error : helperText;

  return (
    <TextField
      {...props}
      {...field}
      error={showError}
      helperText={resolvedHelperText}
      value={field.value ?? ''}
    />
  );
};
