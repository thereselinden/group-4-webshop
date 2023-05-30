import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';

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
        <LockIcon color="accent" fontSize="large" />
        <Typography variant="h4">Logga in</Typography>
        <FormInputField
          name="email"
          control={control}
          label="E-postadress"
          minLength={4}
        />
        <FormInputField
          name="password"
          control={control}
          label="Lösenord"
          minLength={3}
        />

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          color="accent"
        >
          Logga in
        </Button>
        <Link
          href="#"
          underline="hover"
          color="inherit"
          onClick={() => handleAccount()}
        >
          Registrera dig
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
