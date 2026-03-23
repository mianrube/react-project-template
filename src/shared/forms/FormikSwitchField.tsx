import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  type SwitchProps,
} from '@mui/material';
import { useField } from 'formik';
import type { ReactNode } from 'react';

export type FormikSwitchFieldProps = Omit<SwitchProps, 'checked' | 'name' | 'onChange'> & {
  helperText?: ReactNode;
  label: ReactNode;
  name: string;
};

export const FormikSwitchField = ({
  helperText,
  label,
  name,
  ...props
}: FormikSwitchFieldProps) => {
  const [field, meta, helpers] = useField<boolean>({ name, type: 'checkbox' });

  const showError = meta.touched && Boolean(meta.error);
  const resolvedHelperText = showError ? meta.error : helperText;

  return (
    <FormControl error={showError} variant="standard">
      <FormControlLabel
        control={
          <Switch
            {...props}
            checked={Boolean(field.value)}
            name={field.name}
            onBlur={field.onBlur}
            onChange={(event) => {
              helpers.setValue(event.target.checked);
            }}
          />
        }
        label={label}
      />

      {resolvedHelperText ? <FormHelperText>{resolvedHelperText}</FormHelperText> : null}
    </FormControl>
  );
};
