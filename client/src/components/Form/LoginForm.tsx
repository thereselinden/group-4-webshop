import { useForm } from 'react-hook-form';
import { ILoginForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { loginSchema } from './formValidate';
import { joiResolver } from '@hookform/resolvers/joi';

type Props = {
  toggleForm: () => void;
  handleClose: () => void;
};

const defaultValue = {
  email: '',
  password: '',
};

const LoginForm = ({ toggleForm, handleClose }: Props) => {
  const { handleSubmit, control, reset } = useForm<ILoginForm>({
    defaultValues: defaultValue,
    resolver: joiResolver(loginSchema),
  });

  const { login, user, isLoading, errorMessage } = useUserContext();

  // useEffect(() => {
  //   handleClose();
  // }, [user]);

  const onSubmit = async (data: ILoginForm) => {
    await login(data);

    //! Kan vi kolla på user på något sätt här?
    //if (!errorMessage) handleClose();
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
