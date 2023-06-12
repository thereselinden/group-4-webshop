import { Controller } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

import TextField from '@mui/material/TextField';

type Props = {
  name: string;
  control: any;
  label: string;
  type: HTMLInputTypeAttribute | undefined;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
};

const FormInputField = ({
  name,
  control,
  label,
  type,
  disabled,
  multiline,
  minRows,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error && error.message}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          type={type}
          fullWidth
          label={label}
          disabled={disabled}
          multiline={multiline}
          minRows={minRows}
          variant="outlined"
          color="textColor"
        />
      )}
    />
  );
};

export default FormInputField;
