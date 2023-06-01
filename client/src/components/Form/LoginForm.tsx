import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';

type Props = {
  handleAccount: () => void;
  handleClose: () => void;
};

const defaultValue = {
  email: '',
  password: '',
};

const LoginForm = ({ handleAccount, handleClose }: Props) => {
  const { handleSubmit, control, reset } = useForm<ILoginForm>({
    defaultValues: defaultValue,
  });
  const { login } = useUserContext();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data: ILoginForm) => {
    const result = await login(data);
    if (result.success) handleClose();
    else {
      console.log(result.message);
      setLoginError(result.message);
      reset();
    }
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
        <LockIcon color="accent" fontSize="large" />
        <Typography variant="h4">Logga in</Typography>
        <FormInputField
          name="email"
          control={control}
          label="E-postadress"
          minLength={4}
          type="email"
        />
        <FormInputField
          name="password"
          control={control}
          label="Lösenord"
          minLength={3}
          type="password"
        />
        {loginError && <Typography>{loginError}</Typography>}
        <Button
          variant="contained"
          // onClick={() => handleClose()}
          //onClick={handleSubmit(onSubmit)}
          type="submit"
          color="accent"
        >
          Logga in
        </Button>
        <Link
          underline="hover"
          color="inherit"
          style={{ cursor: 'pointer' }}
          onClick={() => handleAccount()}
        >
          Registrera dig
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
