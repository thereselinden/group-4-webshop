import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type Props = {
  name: string;
  control: any;
  label: string;
  type: string;
};

const FormInputField = ({ name, control, label, type }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error && error.message}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          type={type}
          fullWidth
          label={label}
          variant="outlined"
          color="textColor"
        />
      )}
    />
  );
};

export default FormInputField;
