import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type Props = {
  name: string;
  control: any;
  label: string;
  minLength: number;
  type: string;
};

const FormInputField = ({ name, control, label, minLength, type }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
        minLength: {
          value: minLength,
          message: 'Du måste ha minst' + minLength + ' tecken',
        },
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
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
