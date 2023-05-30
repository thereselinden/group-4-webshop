import { useForm } from 'react-hook-form';
import { IRegisterForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HowToRegIcon from '@mui/icons-material/HowToReg';

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
      <form
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
          gap: 15,
        }}
      >
        <HowToRegIcon color="accent" fontSize="large" />

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

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          color="accent"
        >
          Registrera konto
        </Button>
        <Link
          color="inherit"
          underline="hover"
          style={{ cursor: 'pointer' }}
          onClick={() => handleAccount()}
        >
          Har du redan ett konto, logga in
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
