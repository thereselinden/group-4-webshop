import { useForm } from 'react-hook-form';
import { IRegisterForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

type Props = {
  handleAccount: () => void;
};

const defaultValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegisterForm = ({ handleAccount }: Props) => {
  const { handleSubmit, control } = useForm<IRegisterForm>({
    defaultValues: defaultValue,
  });

  const onSubmit = async (data: IRegisterForm) => {
    const res = await fetch('api/users/register', {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const data1 = await res.json();
    console.log('Submit register data', data1);
  };

  return (
    <>
      <form>
        <Typography variant="h4">Registrera konto</Typography>
        <FormInputField
          name="firstName"
          control={control}
          label="Förnamn"
          minLength={4}
        />

        <FormInputField
          name="lastName"
          control={control}
          label="Efternamn"
          minLength={4}
        />

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
          Registrera konto
        </Button>
      </form>
      <Typography onClick={() => handleAccount()}>
        Har du redan ett konto, logga in
      </Typography>
    </>
  );
};

export default RegisterForm;
