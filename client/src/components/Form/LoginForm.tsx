import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

type Props = {
  handleAccount: () => void;
};

const defaultValue = {
  email: '',
  password: '',
};

const LoginForm = ({ handleAccount }: Props) => {
  const { handleSubmit, control } = useForm<ILoginForm>({
    defaultValues: defaultValue,
  });
  const onSubmit = async (data: ILoginForm) => {
    const res = await fetch('api/users/login', {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const data1 = await res.json();
    console.log('Submit data', data1);
  };

  return (
    <>
      <form>
        <Typography variant="h4">Logga in</Typography>
        <FormInputField
          name="email"
          control={control}
          label="Email"
          minLength={4}
        />
        <FormInputField
          name="password"
          control={control}
          label="Password"
          minLength={3}
        />

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Logga in
        </Button>
      </form>
      <Typography onClick={() => handleAccount()}>Registrera dig</Typography>
    </>
  );
};

export default LoginForm;
