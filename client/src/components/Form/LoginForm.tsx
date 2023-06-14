import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';

import { ILoginForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import { useUserContext } from '../../context/UserContext';
import { loginSchema } from './formValidate';

type Props = {
  toggleForm: () => void;
};

const defaultValue = {
  email: '',
  password: '',
};

const LoginForm = ({ toggleForm }: Props) => {
  const { handleSubmit, control } = useForm<ILoginForm>({
    defaultValues: defaultValue,
    resolver: joiResolver(loginSchema),
  });

  const { login, isLoading, errorMessage } = useUserContext();

  const onSubmit = async (data: ILoginForm) => {
    login(data);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <LockIcon fontSize="large" />
        <Typography variant="h4">Logga in</Typography>
        <FormInputField
          name="email"
          control={control}
          label="E-postadress"
          type="email"
        />
        <FormInputField
          name="password"
          control={control}
          label="Lösenord"
          type="password"
        />
        {errorMessage && <Typography>{errorMessage}</Typography>}
        <Button variant="contained" type="submit" color="accent">
          {isLoading ? <CircularProgress /> : 'Logga in'}
        </Button>
        <Link
          underline="hover"
          color="inherit"
          style={{ cursor: 'pointer' }}
          onClick={() => toggleForm()}
        >
          Registrera dig
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
